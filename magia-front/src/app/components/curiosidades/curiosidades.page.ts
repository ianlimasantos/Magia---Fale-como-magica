import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-curiosidades',
  templateUrl: './curiosidades.page.html',
  styleUrls: ['./curiosidades.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonImg , CommonModule, FormsModule]
})
export class CuriosidadesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
