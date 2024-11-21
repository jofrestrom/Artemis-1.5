import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRUserPage } from './qr-user.page';

const routes: Routes = [
  {
    path: '',
    component: QRUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRUserPageRoutingModule {}
