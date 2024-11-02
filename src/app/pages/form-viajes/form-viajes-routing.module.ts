import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormViajesPage } from './form-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: FormViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormViajesPageRoutingModule {}
