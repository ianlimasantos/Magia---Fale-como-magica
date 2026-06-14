import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';
import { MultiplaEscolhaModel } from 'src/app/models/multiplaEscolha/multipla-escolha-model';
import { GeneratedActivityService } from 'src/app/services/generated-activity-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultipleChoiceService } from 'src/app/services/multiple-choice-service';
import { CreateMultiplaEscolhaOpenAiModel } from 'src/app/models/multiplaEscolha/create-multiple-choice-openAi';
import { GeneratedActivityModel } from 'src/app/models/generated-activity/generated-activity-model';
import { ModalAcertosComponent } from '../shared/modal-acertos/modal-acertos.component';

@Component({
  selector: 'app-multipla-escolha',
  templateUrl: './multipla-escolha.page.html',
  styleUrls: ['./multipla-escolha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ModalAcertosComponent]
})
export class MultiplaEscolhaPage implements OnInit {


  nivel!: string;
  tema!: string;
  quantidade!: number;
  isCorrect: boolean | null = null;
  isDisabled: boolean = false;
  selectedOption: string | null = null;

  generatedActivity?: GeneratedActivityModel;
  index = 0;
  acertos = 0;
  isloading: boolean = false;

  counter: number = 0;
  multiplaEscolha!: MultiplaEscolhaModel;
  multiplaEscolhaArray: MultiplaEscolhaModel[] = [];
  isModalAcertosOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private multipleChoiceService: MultipleChoiceService,
    private generatedActivityService: GeneratedActivityService,
    private router: Router
  ) { }

  ngOnInit() {

    const activityId =this.route.snapshot.paramMap.get('id');

    if(activityId){
      this.loadActivity(activityId);
      return;
    }

    this.nivel =  this.route.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.route.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.route.snapshot.queryParamMap.get('quantidade')) || 5;
    this.createMultipleChoice(this.tema, this.nivel, this.quantidade);
  }

  loadActivity(activityId: string) {
    this.generatedActivityService.getMultipleChoiceGeneratedActivity(activityId).subscribe({
      next: (generatedActivity: GeneratedActivityModel) => {
        console.log('Atividade gerada carregada:', generatedActivity);
        this.generatedActivity = generatedActivity;
        console.log(this.generatedActivity);
        this.quantidade = generatedActivity.quantity;
        this.multiplaEscolhaArray = generatedActivity.multipleChoices || [];
        this.multiplaEscolha = this.multiplaEscolhaArray[this.counter];
      },
      error: (error) => {
        console.error('Erro ao carregar atividade gerada:', error);
      },
      complete: () => {
        console.log('Atividade gerada carregada com sucesso');
      }
    });
  }

  createMultipleChoice(tema: string, nivel: string, quantidade: number) {
    this.isloading = true;
    this.multipleChoiceService.createMultipleChoice(tema, nivel, quantidade).subscribe({
      next: (createMultipleChoice: CreateMultiplaEscolhaOpenAiModel) => {
        console.log(createMultipleChoice);
        this.generatedActivity = createMultipleChoice.GeneratedActivityDto;
        this.multiplaEscolhaArray = createMultipleChoice.MultipleChoiceDto;
        this.multiplaEscolha = this.multiplaEscolhaArray[this.counter];
      },
      error: (error: any) => {
        this.isloading = false;
        //this.error = true;
        setTimeout(() => {
          // this.error = false;
          this.router.navigate(['/tabs/config-ia']);
        }, 5000);
      },
      complete: () => {
        this.isloading = false;
      }
    });
  }


  checkAnswer(option: string) {
    this.selectedOption = option;
    this.isCorrect = option === this.multiplaEscolha.correct_answer_es;

    if(this.isCorrect) {
      this.acertos++;
    }

  }

  next() {
    this.selectedOption = null;
    this.isCorrect = null;

    if (this.counter < this.multiplaEscolhaArray.length - 1) {
      this.counter++;
      this.multiplaEscolha = this.multiplaEscolhaArray[this.counter];
    }else{
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
      }, 5000);
    }
  }

}
