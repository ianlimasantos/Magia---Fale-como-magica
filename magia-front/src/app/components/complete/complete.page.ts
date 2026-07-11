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
import { GeneratedActivityService } from 'src/app/services/generated-activity-service';
import { GeneratedActivityModel } from 'src/app/models/generated-activity/generated-activity-model';
import { ModalAcertosComponent } from '../shared/modal-acertos/modal-acertos.component';
import { ErroComponent } from '../shared/erro/erro.component';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ModalComponent, ModalAcertosComponent, ErroComponent, LoadingComponent]
})
export class CompletePage implements OnInit {


  nivel!: string;
  tema!: string;
  quantidade!: number;

  counter: number = 0;

  createCompleteOpenAiDto!: CreateCompleteOpenAiDto;
  generatedActivity!: GeneratedActivityModel;
  completeActivity!: CompleteActivityModel;
  partes: string[] = [];

  userAnswer: string = '';
  isCorrect: boolean | null = null;
  isModalOpen: boolean = false;
  isDisabled: boolean = false;
  acertos = 0;
  isloading: boolean = false;
  isModalAcertosOpen = false;
  error: boolean = false;
  mensagemDeErro: string = '';


  completeActivityArray: CompleteActivityModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private completeService: CompleteService,
    private generatedActivityService: GeneratedActivityService,
  ) {}

  ngOnInit() {

    const activityId =this.route.snapshot.paramMap.get('id');

    if(activityId){
      this.loadActivity(activityId);
      return;
    }

    this.nivel =  this.activatedRoute.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.activatedRoute.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.activatedRoute.snapshot.queryParamMap.get('quantidade')) || 5;
    this.loadCompleteActivityFromApi(this.tema, this.nivel, this.quantidade);
  }


  loadActivity(activityId: string) {
    this.isloading = true;
    this.generatedActivityService.getCompleteGeneratedActivity(activityId).subscribe({
      next: (generatedActivity: GeneratedActivityModel) => {
        this.generatedActivity = generatedActivity;
        this.quantidade = generatedActivity.quantity;
        this.completeActivityArray = this.generatedActivity.completes || [];
        this.loadQuestion();
        this.isloading = false;
      },
      error: (error) => {
        this.isloading = false;
        this.error = true;
        this.mensagemDeErro = 'Erro ao buscar Atividade';
        setTimeout(() => {
          this.error = false;
          this.router.navigate(['/tabs/config-ia']);
        }, 5000);
      },
      complete: () => {
        this.isloading = false;
      }
    });
  }


  loadCompleteActivityFromApi(tema: string, nivel: string, quantidade: number) {
    this.isloading = true;
    this.completeService.createCompleteActivities(tema, nivel, quantidade).subscribe({
      next: (response: CreateCompleteOpenAiDto) => {
        this.createCompleteOpenAiDto = response;
        this.completeActivityArray = response.createCompleteDto;
        this.generatedActivity = response.createGeneratedActivityDto;
        this.loadQuestion();
        this.isloading = false;
      },
      error: (error) => {
        this.isloading = false;
        this.error = true;
        this.mensagemDeErro = 'Erro ao carregar Atividade:';
        setTimeout(() => {
          this.error = false;
          this.router.navigate(['/tabs']);
        }, 5000);
      },
      complete: () => {
        this.isloading = false;
      }
    });
  }

  loadQuestion() {
    this.completeActivity = this.completeActivityArray[this.counter];
    this.partes = this.completeActivity.question.split('______');
    console.log(this.completeActivity);
  }

  checkAnswer() {

    const resposta = this.userAnswer.trim().toLowerCase();
    const correta = this.completeActivity.correct_answer_es.trim().toLowerCase();

    if (!resposta) return;

    this.isCorrect = resposta === correta;
    this.isDisabled = true;

    if(this.isCorrect) {
      this.acertos++;
    }
  }

  next() {
    this.userAnswer = '';
    this.isCorrect = null;
    this.isDisabled = false;

    if (this.counter < this.completeActivityArray.length - 1) {
      this.counter++;
      this.loadQuestion();
    } else {
      this.generatedActivityService.registerProgress(
        this.generatedActivity?.id || '',
        this.generatedActivity?.userId|| '',
        this.acertos,
        this.quantidade
      ).subscribe({
          next: () => {
            this.isloading = false;
          },
          error: (error) => {
            this.isloading = false;
            this.error = true;
            this.mensagemDeErro = 'Erro ao registrar progresso'
            setTimeout(() => {
              this.error = false;
              this.router.navigate(['/tabs']);
            }, 5000);
          },
          complete: () => {
            this.isloading = false;
          }
        }
      );
      this.isModalAcertosOpen = true;
      setTimeout(() => {
        this.isModalAcertosOpen = false;
        this.router.navigate(['/tabs']);
      }, 5000);
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
