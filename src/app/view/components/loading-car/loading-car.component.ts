import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-car',
  templateUrl: './loading-car.component.html',
  styleUrls: ['./loading-car.component.scss'],
})
export class LoadingCarComponent  implements OnInit {
  dummmy = Array(6);
  constructor() { }

  ngOnInit() {}

}
