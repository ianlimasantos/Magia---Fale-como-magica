import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonImg,
    IonItem,
    IonLabel,
    IonInput,
    IonButton]
})

export class LoginPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
