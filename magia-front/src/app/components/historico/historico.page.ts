import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivityResultComponent } from '../activity-result/activity-result.component';
import { UserActivityProgressHistoricService } from 'src/app/services/user-activity-progress-historic-service';
import { UserActivityProgressHistoryModel } from 'src/app/models/userActivityProgress/user-activity-progress-history-model';
import { LoadingComponent } from '../shared/loading/loading.component';
import { isRTL } from 'ionicons/dist/types/components/icon/utils';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ActivityResultComponent, LoadingComponent]
})
export class HistoricoPage implements OnInit {


  tipoSelecionado: string = '';
  userActivityProgress: UserActivityProgressHistoryModel[] = [];
  isLoading: boolean = false;

  constructor(private userActivityProgressHistoricService: UserActivityProgressHistoricService) {}

  ngOnInit(){

  }



  abrirAtividade(atividade: any) {
    console.log(atividade);
  }

  getHistoricByType(type: string) {
    this.isLoading = true;
    this.userActivityProgressHistoricService.getHistoricByType(type).subscribe({
      next: (result) => {
        this.userActivityProgress = result;
        console.log(result);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Request completed');
      }
    })
  }

}
