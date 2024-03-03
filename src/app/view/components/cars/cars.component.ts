import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent  implements OnInit {
  @Input() listaCarros: any;
  constructor() { }

  ngOnInit() {}

}
