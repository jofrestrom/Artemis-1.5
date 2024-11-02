import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViajesPageRoutingModule } from './form-viajes-routing.module';

import { FormViajesPage } from './form-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViajesPageRoutingModule
  ],
  declarations: [FormViajesPage]
})
export class FormViajesPageModule {}
