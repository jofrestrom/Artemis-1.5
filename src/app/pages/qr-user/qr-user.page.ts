import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-qr-user',
  templateUrl: './qr-user.page.html',
  styleUrls: ['./qr-user.page.scss'],
})
export class QRUserPage implements OnInit {

  constructor(private usuarioService: UsuarioService, private viajeService: ViajeService ) { }

  usuario: any;
  viaje: any;

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    
    this.viaje = await this.viajeService.validarViajeP(this.usuario.rut)
  }

}
