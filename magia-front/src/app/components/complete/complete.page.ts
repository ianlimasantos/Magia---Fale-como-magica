import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CompleteActivityModel } from 'src/app/models/completeActivity/complete-activity-model';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CompletePage implements OnInit {

  counter: number = 0;

  completeActivity!: CompleteActivityModel;
  partes: string[] = [];

  userAnswer: string = '';
  isCorrect: boolean | null = null;

  completeActivityArray: CompleteActivityModel[] = [
    {
      id: 1,
      question: "Ana ______ a la calle ayer. (salir)",
      type: TipoAtividade.Completar,
      correct_answer: "salió",
      explanation: "Ayer indica pretérito indefinido, por eso usamos 'salió'."
    },
    {
      id: 2,
      question: "Voy ______ trabajar en metro.",
      type: TipoAtividade.Completar,
      correct_answer: "a",
      explanation: "El verbo 'ir' usa la preposición 'a' para indicar destino."
    },
    {
      id: 3,
      question: "Busco ______ piso en el centro.",
      type: TipoAtividade.Completar,
      correct_answer: "un",
      explanation: "Se usa 'un' porque es algo no específico y 'piso' es masculino."
    },
    {
      id: 4,
      question: "Madrid ______ una ciudad muy grande.",
      type: TipoAtividade.Completar,
      correct_answer: "es",
      explanation: "Se usa 'ser' para características permanentes."
    },
    {
      id: 5,
      question: "Trabajo ______ ganar dinero.",
      type: TipoAtividade.Completar,
      correct_answer: "para",
      explanation: "'Para' indica finalidad (objetivo)."
    },
    {
      id: 6,
      question: "Ayer ______ tapas con mis amigos. (comer)",
      type: TipoAtividade.Completar,
      correct_answer: "comí",
      explanation: "Ayer indica acción terminada en el pasado (pretérito indefinido)."
    }
  ];

  constructor() {}

  ngOnInit() {
    this.loadQuestion();
  }

  /* 🔄 carregar pergunta */
  loadQuestion() {
    this.completeActivity = this.completeActivityArray[this.counter];
    this.partes = this.completeActivity.question.split('______');
  }

  /* ✅ validar resposta */
  checkAnswer() {

    const resposta = this.userAnswer.trim().toLowerCase();
    const correta = this.completeActivity.correct_answer.trim().toLowerCase();

    if (!resposta) return;

    this.isCorrect = resposta === correta;

    setTimeout(() => {
      this.next();
    }, 1200);
  }

  /* ➡ próxima pergunta */
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
}
