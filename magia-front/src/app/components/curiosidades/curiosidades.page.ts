import { CuriosidadeService } from './../../services/curiosidade-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner  } from '@ionic/angular/standalone';
import { CuriosityCardModel } from 'src/app/models/curiosidade/curiosity-card-model';
import { Router } from '@angular/router';
import { TipoAtividade } from 'src/app/models/enums/tipo-atividade';


@Component({
  selector: 'app-curiosidades',
  templateUrl: './curiosidades.page.html',
  styleUrls: ['./curiosidades.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,  CommonModule,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonImg, IonSpinner, ReactiveFormsModule ]
})
export class CuriosidadesPage implements OnInit {

  loading: boolean = false;
  curiosity: boolean = false;
  text: string = '';
  routerToNavigate = inject(Router);

  countries: string[] = [
    'Argentina',
    'Bolívia',
    'Brasil',
    'Chile',
    'Colômbia',
    'Costa Rica',
    'Cuba',
    'Equador',
    'El Salvador',
    'Guatemala',
    'Haiti',
    'Honduras',
    'México',
    'Nicarágua',
    'Panamá',
    'Paraguai',
    'Peru',
    'República Dominicana',
    'Uruguai',
    'Venezuela'
  ];

  newCuriosity: FormGroup = new FormGroup({
    theme: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  constructor(private curiosidadeService: CuriosidadeService, private router: Router) { }

  ngOnInit() {

  }

  generateActivity(type: string){
    const temaEscolhido = `(${this.newCuriosity.value.theme} - ${this.newCuriosity.value.country})` + ' ' + this.text + ' .' + 'Rule to generate the activity: use words that appear in the text before.'
    console.log(temaEscolhido);
    if(type == TipoAtividade.Multipla_Escolha) {
      this.routerToNavigate.navigate(['/multipla-escolha'], {queryParams: { tema: temaEscolhido}});
    } else if(type == TipoAtividade.Completar) {
      this.routerToNavigate.navigate(['/complete'], {queryParams: { tema: temaEscolhido}});
    } else if(type == TipoAtividade.Flashcards) {
      console.log('Iniciando atividade de Flashcards com os seguintes parâmetros:');
      this.routerToNavigate.navigate(['/flashcards'], {queryParams: { tema: temaEscolhido}});
    }
  }

  generateCuriosity(){
    this.curiosidadeService.createCuriosity(this.newCuriosity.value.country, this.newCuriosity.value.theme).subscribe({
      next: (curiosidade) => {
        this.text = curiosidade.curiosity;
        this.curiosity = true;
      }
    });

  }

}
