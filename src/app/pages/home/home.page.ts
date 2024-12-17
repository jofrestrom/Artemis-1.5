import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  mostrar = false; // Estado inicial  
  constructor( private viajeSer: ViajeService,private navController: NavController) {}

  usuario: any;
  usuarioRut: string;
  viaje: any;
  viajes: any;
  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');

    this.viajes = await this.viajeSer.validarViajeP(this.usuario.rut)
    console.log("viaje 2", this.viajes);
    

    this.viajeSer.validarViajeP(this.usuario.rut).then((viaje) => {
      this.viaje = viaje;
      console.log("viaje ", this.viaje);
    });
  }
  
  home(){
    this.navController.navigateRoot('/home');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

}
