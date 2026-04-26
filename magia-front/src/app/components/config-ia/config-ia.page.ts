import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';

@Component({
  selector: 'app-config-ia',
  templateUrl: './config-ia.page.html',
  styleUrls: ['./config-ia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfigIaPage implements OnInit {

  tipo!: TipoAtividade;
  tipoLabel: Record<TipoAtividade, string> = {
    'Multipla_Escolha': '\u{1F9E0} Múltipla Escolha',
    'Completar': '\u{270D}\uFE0F Completar Frases',
    'Flashcards': '\u{1F0CF} Flashcards'
  };

  nivel: string = 'A1';
  tema: string = '';
  quantidade: number = 5;

  niveis = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor(private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.tipo = this.router.snapshot.queryParamMap.get('tipo') as TipoAtividade;
    console.log('Tipo recebido na configuração:', this.tipo);

  }

  start() {
    console.log({
      nivel: this.nivel,
      tema: this.tema,
      quantidade: this.quantidade
    });
  }

}
