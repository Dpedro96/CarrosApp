import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { IonicModule } from '@ionic/angular';
import { LoadingCarComponent } from './loading-car/loading-car.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { ItemsComponent } from './items/items.component';



@NgModule({
  declarations: [CarsComponent, LoadingCarComponent, EmptyScreenComponent,ItemsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CarsComponent, LoadingCarComponent,EmptyScreenComponent,ItemsComponent]
})
export class ComponentsModule { }
