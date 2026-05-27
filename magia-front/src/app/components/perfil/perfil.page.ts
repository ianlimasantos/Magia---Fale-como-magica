import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GetAccountModel } from 'src/app/models/account/get-account-model';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user: GetAccountModel = {
    id: '12345',
    name: 'Ian Bernardo',
    email: 'ian@email.com',
    dateOfBirth: '2000-05-15'
  };

  async logout(){
    await Preferences.remove({
      key: 'token'
    });
    this.router.navigate(['/login']);
  }

}
