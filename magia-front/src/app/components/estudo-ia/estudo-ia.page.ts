import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {  IonButton, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-estudo-ia',
  templateUrl: './estudo-ia.page.html',
  styleUrls: ['./estudo-ia.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EstudoIAPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToConfig(tipo: string) {
    console.log('Tipo selecionado:', tipo);
    this.router.navigate(['/config-ia'], {queryParams: {tipo}});
  }

}
