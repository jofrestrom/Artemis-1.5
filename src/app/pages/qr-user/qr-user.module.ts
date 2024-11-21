import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRUserPageRoutingModule } from './qr-user-routing.module';

import { QRUserPage } from './qr-user.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRUserPageRoutingModule,
    QRCodeModule
  ],
  declarations: [QRUserPage]
})
export class QRUserPageModule {}
