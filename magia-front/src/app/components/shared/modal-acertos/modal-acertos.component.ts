import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-acertos',
  templateUrl: './modal-acertos.component.html',
  styleUrls: ['./modal-acertos.component.scss'],
})
export class ModalAcertosComponent  implements OnInit {

  @Input()
  open: boolean = false;

  @Input()
  correctAnswers: number = 0;
  
  @Input()
  totalQuestions: number = 0;

  constructor() { }

  ngOnInit() {}

}
