import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivityResultComponent } from '../activity-result/activity-result.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ActivityResultComponent]
})
export class HistoricoPage  {

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
