import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  constructor(private viajeService: ViajeService, private UsuarioService: UsuarioService) { }

  viajes: any;
  usuario: any;
  viaje: any;
  async ngOnInit() {
    this.ObtenerViajes();
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.viaje = await this.viajeService.buscarViajeP(this.usuario.rut)
  }
  
  async ObtenerViajes(){
    this.viajes = await this.viajeService.getViajes()
  }



}
