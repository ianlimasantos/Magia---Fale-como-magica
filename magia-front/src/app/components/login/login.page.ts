import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login-service';
import { Preferences } from '@capacitor/preferences';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonImg,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    LoadingComponent]
})

export class LoginPage implements OnInit {

  credencialInvalida: boolean = false;
  isloading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  onLogin() {
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    if (this.loginForm.invalid) {
      return;
    }

    this.isloading = true;
    this.loginService.authenticate(email, password).subscribe({
      next: async(response: any) => {
        await Preferences.set({
          key: 'token',
          value: response.token
        })
        this.isloading = false;
        this.router.navigate(['/tabs']);
      },
      error: (error: any) => {
        console.error('Erro ao autenticar:', error);
        this.credencialInvalida = true;
        this.isloading = false;
      },
      complete: () => {
        console.log('Requisição de login concluída.');
        this.isloading = false;
      }
    });
  }
}
