import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FlashcardsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  index = 0;
  isFlipped = false;

  flashcards = [
    { front: '¿Qué significa empadronarse?', back: 'Registrarse en el ayuntamiento' },
    { front: '¿Qué es NIE?', back: 'Número de Identidad de Extranjero' }
  ];

  get currentCard() {
    return this.flashcards[this.index];
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  next() {
    if (this.index < this.flashcards.length - 1) {
      this.index++;
      this.isFlipped = false;
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this.isFlipped = false;
    }
  }
}
