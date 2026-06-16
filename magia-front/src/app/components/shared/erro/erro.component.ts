import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss'],
})
export class ErroComponent  implements OnInit {

  @Input()
  error: boolean = false;
  @Input()
  errorMessage?: string;
  constructor() { }

  ngOnInit() {}

}
