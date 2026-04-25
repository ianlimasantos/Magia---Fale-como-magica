import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, IonLabel } from '@ionic/angular';
import { CreateAccountService } from 'src/app/services/create-account-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class CreateAccountPage implements OnInit {


  constructor(private createAccountService: CreateAccountService){}

  ngOnInit() {
  }

  newUserForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    dateOfBirth: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });


  createAccount(){
    const form = this.newUserForm.getRawValue();
    const userToSave = {
      ...form
    }

    this.createAccountService.createAccount(userToSave).subscribe(
      {
        next: ()=> {console.log('ian')},
        error: (error)=> {console.log(error)},
        complete: ()=> {console.log('finalizado')}
      }
    )

  }
}
