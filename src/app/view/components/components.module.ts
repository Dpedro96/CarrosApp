import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { IonicModule } from '@ionic/angular';
import { LoadingCarComponent } from './loading-car/loading-car.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { ItemsComponent } from './items/items.component';
import { ItemsCadastrarComponent } from './items-cadastrar/items-cadastrar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CarsComponent, LoadingCarComponent, EmptyScreenComponent,ItemsComponent, ItemsCadastrarComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[CarsComponent, LoadingCarComponent,EmptyScreenComponent,ItemsComponent, ItemsCadastrarComponent]
})
export class ComponentsModule { }
