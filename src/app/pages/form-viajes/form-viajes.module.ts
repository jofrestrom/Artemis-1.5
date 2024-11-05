import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViajesPageRoutingModule } from './form-viajes-routing.module';

import { FormViajesPage } from './form-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViajesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormViajesPage]
})
export class FormViajesPageModule {}
