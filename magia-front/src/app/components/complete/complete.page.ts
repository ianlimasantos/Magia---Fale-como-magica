import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CompleteActivityModel } from 'src/app/models/completeActivity/complete-activity-model';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component';
import { CreateCompleteOpenAiDto } from 'src/app/models/completeActivity/create-complete-openAi-model';
import { CompleteService } from 'src/app/services/complete-service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ModalComponent]
})
export class CompletePage implements OnInit {


  nivel!: string;
  tema!: string;
  quantidade!: number;

  counter: number = 0;

  createCompleteOpenAiDto!: CreateCompleteOpenAiDto;
  completeActivity!: CompleteActivityModel;
  partes: string[] = [];

  userAnswer: string = '';
  isCorrect: boolean | null = true;
  isModalOpen: boolean = false;

  acertos = 0;
  isloading: boolean = false;
  isModalAcertosOpen = false;
  error: boolean = false;


  completeActivityArray: CompleteActivityModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private completeService: CompleteService
  ) {}

  ngOnInit() {
    this.nivel =  this.activatedRoute.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.activatedRoute.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.activatedRoute.snapshot.queryParamMap.get('quantidade')) || 5;
    this.loadCompleteActivityFromApi(this.tema, this.nivel, this.quantidade);
  }

  loadCompleteActivityFromApi(tema: string, nivel: string, quantidade: number) {
    this.completeService.createCompleteActivities(tema, nivel, quantidade).subscribe({
      next: (response: CreateCompleteOpenAiDto) => {
        console.log(response);
        this.createCompleteOpenAiDto = response;
        this.completeActivityArray = response.createCompleteDto;
        this.loadQuestion();
      },
      error: (error) => {
        console.error('Error fetching complete activities:', error);
      },
      complete: () => {
        console.log('Complete activities loaded successfully');
        //this.loadQuestion();
      }
    });
  }

  loadQuestion() {
    this.completeActivity = this.completeActivityArray[this.counter];
    this.partes = this.completeActivity.question.split('______');
  }

  checkAnswer() {

    const resposta = this.userAnswer.trim().toLowerCase();
    const correta = this.completeActivity.correct_answer.trim().toLowerCase();

    if (!resposta) return;

    this.isCorrect = resposta === correta;

    if(this.isCorrect) {
      this.acertos++;
    }
  }

  next() {
    this.userAnswer = '';
    this.isCorrect = null;

    if (this.counter < this.completeActivityArray.length - 1) {
      this.counter++;
      this.loadQuestion();
    } else {
      console.log('acabou o quiz 🎉');
      // aqui você pode redirecionar ou mostrar resultado final
    }
  }

  openModal(){
    (document.activeElement as HTMLElement)?.blur();
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  sairDaAtividade(){
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs']);
  }
}
