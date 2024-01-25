import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPageRoutingModule } from './detalhes-routing.module';

import { DetalhesPage } from './detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetalhesPageRoutingModule
  ],
  declarations: [DetalhesPage]
})
export class DetalhesPageModule {}
