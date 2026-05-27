import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from 'src/app/services/flashcard-service';
import { FlashcardModel } from 'src/app/models/flashcard/flashcard-model';
import {
  TextToSpeech
} from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FlashcardsPage implements OnInit {

  nivel!: string;
  tema!: string;
  quantidade!: number;
  flashcards: FlashcardModel[] = [];

  constructor(private route: ActivatedRoute, private flashcardService: FlashcardService) {}

  ngOnInit() {
    this.nivel =  this.route.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.route.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.route.snapshot.queryParamMap.get('quantidade')) || 5;
    this.createFlashcard(this.tema, this.nivel, this.quantidade);
  }

  index = 0;
  isFlipped = false;

  // flashcards = [
  //   { front: '¿Qué significa empadronarse?', back: 'Registrarse en el ayuntamiento' },
  //   { front: '¿Qué es NIE?', back: 'Número de Identidad de Extranjero' }
  // ];

  createFlashcard(tema: string, nivel: string, quantidade: number) {
    this.flashcardService.createFlashcards(tema, nivel, quantidade).subscribe({
      next: (flashcards: FlashcardModel[]) => {
        this.flashcards = flashcards;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Flashcards criados com sucesso");
      }
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  next(){
    if(this.index < this.flashcards.length - 1){
      this.index++;
      this.isFlipped = false;
    }
  }

  prev(){
    if( this.index > 0){
      this.index--;
      this.isFlipped = false;
    }
  }

  async speak() {
   await TextToSpeech.speak({
    text: 'curro',
    lang: 'es-ES',
    rate: 0.9,
    pitch: 1.0,
    volume: 1.0
  });
  }

}
