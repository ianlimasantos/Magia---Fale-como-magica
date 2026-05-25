import { CuriosidadeService } from './../../services/curiosidade-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner  } from '@ionic/angular/standalone';
import { CuriosityCardModel } from 'src/app/models/curiosidade/curiosity-card-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-curiosidades',
  templateUrl: './curiosidades.page.html',
  styleUrls: ['./curiosidades.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,  CommonModule,
    FormsModule,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonImg, IonSpinner ]
})
export class CuriosidadesPage implements OnInit {

  curiosidades: CuriosityCardModel[] = [];
  loading: boolean = false;

  constructor(private curiosidadeService: CuriosidadeService, private router: Router) { }

  ngOnInit() {
    this.findCuriosities();
  }

  findCuriosities(){
    this.curiosidadeService.findCuriosities().subscribe({
      next: (curiosidades: CuriosityCardModel[]) => {
        this.curiosidades = curiosidades;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("iannn");
      }
    })
  }

  openCuriosityDetail(id: string){
    this.router.navigate([`/tabs/curiosidade-detalhe/${id}`]);
  }

  onButtonClicked(){
    this.loading = !this.loading;
  }

}
