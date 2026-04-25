import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';
import { MultiplaEscolhaModel } from 'src/app/models/multiplaEscolha/multipla-escolha-model';

@Component({
  selector: 'app-multipla-escolha',
  templateUrl: './multipla-escolha.page.html',
  styleUrls: ['./multipla-escolha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MultiplaEscolhaPage implements OnInit {


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
    },
    {
      "id": 2,
      "question": "¿Qué documento necesitas para trabajar legalmente en España como extranjero?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["NIE", "Pasaporte únicamente", "Carné de estudiante", "Licencia de conducir"],
      "correct_answer": "NIE",
      "explanation": "El NIE (Número de Identidad de Extranjero) es necesario para trabajar y realizar trámites legales."
    },
    {
      "id": 3,
      "question": "¿Qué significa 'piso compartido'?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["Vivir con otras personas en el mismo apartamento", "Un apartamento de lujo", "Una casa en el campo", "Un hotel económico"],
      "correct_answer": "Vivir con otras personas en el mismo apartamento",
      "explanation": "Un piso compartido es una vivienda donde varias personas comparten gastos y espacios."
    },
    {
      "id": 4,
      "question": "¿Qué es la 'siesta' en la cultura española?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["Una comida típica", "Una pausa para dormir después del almuerzo", "Un tipo de trabajo", "Un transporte público"],
      "correct_answer": "Una pausa para dormir después del almuerzo",
      "explanation": "La siesta es una tradición de descansar o dormir un poco después de comer."
    },
    {
      "id": 5,
      "question": "¿Cuál es el horario típico de la cena en España?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["Entre las 21:00 y 23:00", "Entre las 17:00 y 18:00", "Entre las 19:00 y 20:00", "Entre las 12:00 y 13:00"],
      "correct_answer": "Entre las 21:00 y 23:00",
      "explanation": "En España se cena bastante tarde en comparación con otros países."
    },
    {
      "id": 6,
      "question": "¿Qué significa 'hacer la compra'?",
      "type": TipoAtividade.Multipla_Escolha,
      "options": ["Ir al supermercado a comprar alimentos", "Comprar una casa", "Vender productos", "Pagar impuestos"],
      "correct_answer": "Ir al supermercado a comprar alimentos",
      "explanation": "Hacer la compra significa comprar comida y productos básicos."
    }
  ]

  constructor() { }

  ngOnInit() {
    this.multiplaEscolha = this.multiplaEscolhaArray[this.contador];
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
