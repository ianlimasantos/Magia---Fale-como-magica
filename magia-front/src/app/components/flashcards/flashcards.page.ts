import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from 'src/app/services/flashcard-service';
import { FlashcardModel } from 'src/app/models/flashcard/flashcard-model';
import {
  TextToSpeech
} from '@capacitor-community/text-to-speech';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CreateFlashcardOpenAiModel } from 'src/app/models/flashcard/create-flashcard-openAi';
import { GeneratedActivityModel } from 'src/app/models/generated-activity/generated-activity-model';
import { GeneratedActivityService } from 'src/app/services/generated-activity-service';
import { ModalAcertosComponent } from '../shared/modal-acertos/modal-acertos.component';
import { ErroComponent } from '../shared/erro/erro.component';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent, ModalAcertosComponent, ErroComponent]
})
export class FlashcardsPage implements OnInit {

  nivel!: string;
  tema!: string;
  quantidade!: number;
  flashcards: FlashcardModel[] = [];
  generatedActivity?: GeneratedActivityModel;
  index = 0;
  acertos = 0;
  isFlipped = false;
  currentCard?: FlashcardModel;
  isloading: boolean = false;
  isModalAcertosOpen = false;
  error: boolean = false;

  constructor(private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private generatedActivityService: GeneratedActivityService,
    private router: Router
  ) {}

  ngOnInit() {

    const activityId =this.route.snapshot.paramMap.get('id');

    if(activityId){
      this.loadActivity(activityId);
      return;
    }

    this.nivel =  this.route.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.route.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.route.snapshot.queryParamMap.get('quantidade')) || 5;
    this.createFlashcard(this.tema, this.nivel, this.quantidade);
  }

  loadActivity(activityId: string) {

  }

  createFlashcard(tema: string, nivel: string, quantidade: number) {
    this.isloading = true;
    this.flashcardService.createFlashcards(tema, nivel, quantidade).subscribe({
      next: (generatedActivity: CreateFlashcardOpenAiModel) => {
        console.log(generatedActivity);
        this.generatedActivity = generatedActivity.generatedActivity;
        this.flashcards = generatedActivity.flashcards;
        this.currentCard = this.flashcards[this.index];
      },
      error: (error: any) => {
        this.isloading = false;
        this.error = true;
        setTimeout(() => {
          this.error = false;
          this.router.navigate(['/tabs/config-ia']);
        }, 7000);
      },
      complete: () => {
        this.isloading = false;
        console.log("Flashcards criados com sucesso");
      }
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  next(){

    if ((this.index + 1) == this.flashcards.length ){
      console.log(`Registrando progresso: ${this.flashcards.length}`);
      this.generatedActivityService.registerProgress(
        this.generatedActivity?.id || '',
        this.generatedActivity?.userId|| '',
        this.acertos,
        this.quantidade
      ).subscribe({
          next: () => {console.log('Progresso registrado com sucesso')},
          error: (error) => {console.log('Erro ao registrar progresso', error)},
          complete: () => {console.log('Registro de progresso finalizado')}
        }
      );
      this.isModalAcertosOpen = true;
      setTimeout(() => {
        this.isModalAcertosOpen = false;
        this.router.navigate(['/tabs']);
      }, 7000);
    }

    if(this.index < this.flashcards.length - 1){
      this.index++;
      this.isFlipped = false;
      this.currentCard = this.flashcards[this.index];
    }



  }

  async speak(word: string | undefined) {
    if (!word) return;
    await TextToSpeech.speak({
      text: word,
      lang: 'es-ES',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0
    });
  }


  esqueci(){
    this.next();
  }

  lembrei(){
    this.acertos++;
    this.next();
  }
}
