import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPerfilUserPageRoutingModule } from './form-perfil-user-routing.module';

import { FormPerfilUserPage } from './form-perfil-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPerfilUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormPerfilUserPage]
})
export class FormPerfilUserPageModule {}
