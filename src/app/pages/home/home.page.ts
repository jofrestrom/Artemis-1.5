import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private viajeSer: ViajeService,private navController: NavController) {}

  async ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.viaje = await this.viajeSer.buscarViajeP(this.usuario.rut)
    console.log("viaje " ,JSON.stringify(this.viaje));
    //this.viajeid = this.viajeSer.buscarids();  
  }

  usuario: any;
  usuarioRut: string;
  viaje: any;
  
  home(){
    this.navController.navigateRoot('/home');
  }

}
