import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'administrar',
        loadChildren: () => import('../administrar/administrar.module').then( m => m.AdministrarPageModule)
      },{
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },{
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule)
      },{
        path: 'form-viajes',
        loadChildren: () => import('../form-viajes/form-viajes.module').then( m => m.FormViajesPageModule)
      },
      {
        path: 'detalle-reserva',
        loadChildren: () => import('../detalle-reserva/detalle-reserva.module').then( m => m.DetalleReservaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
