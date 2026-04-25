import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}

  tipoSelecionado: string = 'MULTIPLA_ESCOLHA';

  atividades = [
    { tipo: 'MULTIPLA_ESCOLHA', tema: 'Viagem', data: '20/04' },
    { tipo: 'COMPLETAR', tema: 'Trabalho', data: '19/04' },
    { tipo: 'FLASHCARDS', tema: 'Comida', data: '18/04' },
  ];

  atividadesFiltradas = this.atividades;

  filtrar(tipo: string) {
    this.tipoSelecionado = tipo;

    this.atividadesFiltradas = this.atividades.filter(
      a => a.tipo === tipo
    );
  }

  abrirAtividade(atividade: any) {
    console.log(atividade);
  }
}
