import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRCompartirPage } from './qr-compartir.page';

const routes: Routes = [
  {
    path: '',
    component: QRCompartirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRCompartirPageRoutingModule {}
