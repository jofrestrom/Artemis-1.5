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

  usuario: any;
  usuarioRut: string;
  viaje: any;
  viajeid : any;

  
  ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.usuarioRut = this.usuario.rut
    this.viaje = this.viajeSer.buscarViajeP(this.usuarioRut)
    console.log("viaje " ,this.viaje);
    //this.viajeid = this.viajeSer.buscarids();
    
  }
  home(){
    this.navController.navigateRoot('/home');
  }

}
