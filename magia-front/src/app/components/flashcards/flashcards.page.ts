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

  get currentCard(){
    return this.flashcards[this.index];
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

  speak() {
    const utterance = new SpeechSynthesisUtterance('curro');

    utterance.lang = 'es-ES'; // espanhol
    utterance.rate = 0.9;

    speechSynthesis.speak(utterance);
  }

  startRecognition(expectedWord: string) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const spokenWord = event.results[0][0].transcript
        .trim()
        .toLowerCase();

      console.log('Você falou:', spokenWord);

      if (spokenWord === expectedWord.toLowerCase()) {
        alert('Pronúncia correta!');
      } else {
        alert(`Você falou: ${spokenWord}`);
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      alert('Erro no reconhecimento de voz.');
    };
  }
}
