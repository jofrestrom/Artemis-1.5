import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRCompartirPageRoutingModule } from './qr-compartir-routing.module';

import { QRCompartirPage } from './qr-compartir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCompartirPageRoutingModule
  ],
  declarations: [QRCompartirPage]
})
export class QRCompartirPageModule {}
