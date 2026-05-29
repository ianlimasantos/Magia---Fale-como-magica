import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-config-ia',
  templateUrl: './config-ia.page.html',
  styleUrls: ['./config-ia.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, CommonModule, FormsModule]
})
export class ConfigIaPage implements OnInit {

  routerToNavigate = inject(Router);
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

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.tipo = this.router.snapshot.queryParamMap.get('tipo') as TipoAtividade;
    console.log('Tipo recebido na configuração:', this.tipo);

  }

  start() {

    if(this.tipo == TipoAtividade.Multipla_Escolha) {

    } else if(this.tipo == TipoAtividade.Completar) {

    } else if(this.tipo == TipoAtividade.Flashcards) {
      console.log('Iniciando atividade de Flashcards com os seguintes parâmetros:');
      this.routerToNavigate.navigate(['/flashcards'], {queryParams: { nivel: this.nivel, tema: this.tema, quantidade: this.quantidade}});
    }
  }

}
