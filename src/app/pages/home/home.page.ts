import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private viajeSer: ViajeService) {}

  usuario: any;
  usuarioRut: any;
  viaje: any;
  mostrar: boolean = true;
  
  ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.usuarioRut = this.usuario.rut

    this.viaje = this.viajeSer.buscarViajeP(this.usuarioRut)

    if(!this.viaje){
      this.mostrar = false
      
    }else{
      console.log(this.viaje);
      this.mostrar = this.mostrar
    
    }
  }
  
}
