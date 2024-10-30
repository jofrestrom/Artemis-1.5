import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPerfilUserPage } from './form-perfil-user.page';

const routes: Routes = [
  {
    path: '',
    component: FormPerfilUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPerfilUserPageRoutingModule {}
