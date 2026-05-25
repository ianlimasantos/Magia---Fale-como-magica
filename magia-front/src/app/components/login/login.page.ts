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
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login-service';

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
    IonButton]
})

export class LoginPage implements OnInit {

  credencialInvalida: boolean = false;

  constructor(private loginService: LoginService) {
  }

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

    console.log(this.loginForm.value);

    this.loginService.authenticate(email, password).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);
      },
      error: (error: any) => {
        console.error('Erro ao autenticar:', error);
        this.credencialInvalida = true;
      },
      complete: () => {
        console.log('Requisição de login concluída.');
      }
    });
  }
}
