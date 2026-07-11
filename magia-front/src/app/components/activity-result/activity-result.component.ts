import { Component, Input, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { UserActivityProgressHistoryModel } from 'src/app/models/userActivityProgress/user-activity-progress-history-model';

@Component({
  selector: 'app-activity-result',
  templateUrl: './activity-result.component.html',
  styleUrls: ['./activity-result.component.scss'],
  imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon]
})
export class ActivityResultComponent  implements OnInit {

  isModalCuriosidadeOpen: boolean = false;

  @Input()
  userActivityProgress?: UserActivityProgressHistoryModel;

  constructor( ) { }

  ngOnInit() {}

  showModalCuriosidade() {
    this.isModalCuriosidadeOpen = true;
  }

  closeModal() {
    this.isModalCuriosidadeOpen = false;
  }
}
