import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { IonicModule } from '@ionic/angular';
import { LoadingCarComponent } from './loading-car/loading-car.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [CarsComponent, LoadingCarComponent, EmptyScreenComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CarsComponent, LoadingCarComponent,EmptyScreenComponent]
})
export class ComponentsModule { }
