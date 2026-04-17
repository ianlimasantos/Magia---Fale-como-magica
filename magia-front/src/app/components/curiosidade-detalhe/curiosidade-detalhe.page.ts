import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CuriosityModel } from 'src/app/models/curiosidade/curiosity-model';
import { Observable } from 'rxjs';
import { CuriosidadeService } from 'src/app/services/curiosidade-service';
import { addIcons } from 'ionicons';
import { caretBack } from 'ionicons/icons';

@Component({
  selector: 'app-curiosidade-detalhe',
  templateUrl: './curiosidade-detalhe.page.html',
  styleUrls: ['./curiosidade-detalhe.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons]
})
export class CuriosidadeDetalhePage implements OnInit {

  id?: string;
  curiosidade!: CuriosityModel;

  constructor(private route: ActivatedRoute, private _curiosityService: CuriosidadeService) {
    addIcons({ caretBack });
  }

  ngOnInit() {
    this.getCuriosity();
  }

  getCuriosity(){
    const idCuriosity = this.route.snapshot.paramMap.get('id');

    if(idCuriosity){
      this._curiosityService.findCuriosity(idCuriosity).subscribe({
        next: (curiosidade: CuriosityModel) => {
          this.curiosidade = curiosidade
        },
        error: (err: any) => {
          console.log("deu erro ao achar essa merda de curiosidade")
        },
        complete: () => {
          console.log("finalizou")
        }
      });
    }
  }
}

