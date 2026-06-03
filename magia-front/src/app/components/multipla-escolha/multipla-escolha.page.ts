import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';
import { MultiplaEscolhaModel } from 'src/app/models/multiplaEscolha/multipla-escolha-model';
import { GeneratedActivityService } from 'src/app/services/generated-activity-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultipleChoiceService } from 'src/app/services/multiple-choice-service';

@Component({
  selector: 'app-multipla-escolha',
  templateUrl: './multipla-escolha.page.html',
  styleUrls: ['./multipla-escolha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MultiplaEscolhaPage implements OnInit {


  nivel!: string;
  tema!: string;
  quantidade!: number;

  contador: number = 0;
  multiplaEscolha!: MultiplaEscolhaModel;
  multiplaEscolhaArray: MultiplaEscolhaModel[] = [
    {
      "id": 1,
      "question": "¿Cuál es el significado de 'empadronarse' en España?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["Registrarse en el ayuntamiento", "Buscar empleo", "Abrir una cuenta bancaria", "Alquilar una vivienda"],
      "correct_answer": "Registrarse en el ayuntamiento",
      "explanation": "Empadronarse significa registrarse oficialmente en el ayuntamiento donde resides."
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private multipleChoiceService: MultipleChoiceService,
    private generatedActivityService: GeneratedActivityService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.multiplaEscolha = this.multiplaEscolhaArray[this.contador];

    this.nivel =  this.route.snapshot.queryParamMap.get('nivel') ?? 'A1';
    this.tema =  this.route.snapshot.queryParamMap.get('tema') ?? '';
    this.quantidade = Number(this.route.snapshot.queryParamMap.get('quantidade')) || 5;
    this.createMultipleChoice(this.tema, this.nivel, this.quantidade);
  }

  createFlashcard(tema: string, nivel: string, quantidade: number) {
      //this.isloading = true;
      this.multipleChoiceService.createMultipleChoice(tema, nivel, quantidade).subscribe({
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

  // checkAnswer(option: string){

  //     if(this.multiplaEscolha.correct_answer == option){
  //       console.log("babado")
  //     }else{
  //       //se tá errado
  //     }


  //   if(this.contador <= this.multiplaEscolhaArray.length - 2){
  //     this.contador++;
  //     this.multiplaEscolha = this.multiplaEscolhaArray[this.contador];
  //   }
  // }

  selectedOption: string | null = null;
isCorrect: boolean | null = null;

checkAnswer(option: string) {
  this.selectedOption = option;
  this.isCorrect = option === this.multiplaEscolha.correct_answer;

  setTimeout(() => {
    this.nextQuestion();
  }, 1200);
}

nextQuestion() {
  this.selectedOption = null;
  this.isCorrect = null;

  if (this.contador <= this.multiplaEscolhaArray.length - 2) {
    this.contador++;
    this.multiplaEscolha = this.multiplaEscolhaArray[this.contador];
  }
}

}
