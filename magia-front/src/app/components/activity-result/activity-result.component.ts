import { Component, Input, OnInit } from '@angular/core';
import { UserActivityProgressHistoryModel } from 'src/app/models/userActivityProgress/user-activity-progress-history-model';

@Component({
  selector: 'app-activity-result',
  templateUrl: './activity-result.component.html',
  styleUrls: ['./activity-result.component.scss'],
})
export class ActivityResultComponent  implements OnInit {


  @Input()
  userActivityProgress?: UserActivityProgressHistoryModel;

  constructor( ) { }

  ngOnInit() {}

}
