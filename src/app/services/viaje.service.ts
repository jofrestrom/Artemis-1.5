import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { stringify } from 'uuid';
import { FireViajesServiceService } from './fire-viajes-service.service';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private storage: Storage, private viajeSer: FireViajesServiceService) {

    this.init();
  }

  usuario: any;
  ViajeAutenticado: any = null;

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
  }

  async init(){
    await this.storage.create();

    let viaje1 = {
      id: '1',
      conductor: 'Juanito Alimaña',
      asientos_disp: 4,
      precio: 2000,
      destino: 'jose covarrubias',
      latit: '-33.61955417047049 ',
      longit: '-70.56958938663026',
      metros_distancia: 3200,
      minutos: '10',
      estado: 'pendiente',
      pasajeros: [],
      };
    this.viajeSer.CrearViaje(viaje1);
  }
  public async CrearViaje(viaje: any): Promise<boolean>{
    let Viajes: any[] = await this.storage.get("Viajes") || [];
    
    if(Viajes.find(v => v.id == viaje.id) != undefined){
      return false;
    }
    

    Viajes.push(viaje);
    await this.viajeSer.CrearViaje(viaje)
    return true
  }

  async buscarViajeP(rut: string){
    //const viajes: any[] = await this.storage.get("Viajes") || [];
    const viajes: any[] = await this.storage.get("Viajes") || [];
    
    const viaje = viajes.find(v=> v.id);
    console.log("viaje encontrado", viaje);
    if(rut == viaje.pasajeros.rut ){
      console.log("hola");
    }
    const pasajeros = viaje.pasajeros;
    for(let p of pasajeros){
      console.log(p);
      if(p.rut == rut){
        console.log("se enconto al pasajero: ", p.rut);
        console.log("pertenece a la id: ", viaje);
        
        return await "Si tiene"; 
      }
    }

    return await "No tiene"; // Si no se encuentra, devolver null
  }
  

  public async tomar_Viaje(rut: string): Promise<any>{
    const viajes: any[] = await this.storage.get("Viajes") || [];
    const viaje = viajes.find(v => v.pasajeros === rut)

    if(viaje.pasajeros.length >= 4){
      alert("el veiculo esta lleno")
    }else{
      alert("viaje tomado con exito")
      viaje.pasajeros.push(rut)
    }

    return false;
    
  }

  public async getViajes(){
    let viajes = this.viajeSer.getViajes();
    return viajes;
  }

  public async getviaje(id :string):Promise <any>{
    let viajes = this.viajeSer.getviaje(id);
    console.log("viaje a tomar: ", viajes);
    return viajes

  }

  public async actualizar_viaje(id: string, pasajero: any): Promise<boolean>{
    let viajes: any[] = await this.storage.get("Viajes") || [];
    let indice: number = viajes.findIndex(v => v.id==id);
    if(indice==-1){
      return false;
    }
    const pasajeros = viajes[indice].pasajeros;
    for(let p of pasajeros){
      console.log(p);
      if(p.rut == pasajero){
        console.log("se enconto al pasajero: ", p.rut);
        console.log("pertenece a la id: ", viajes[indice]);
        
        return false; 
      }
    }
    viajes[indice].pasajeros.push(pasajero);
    viajes[indice].asientos_disp = viajes[indice].asientos_disp - 1;
    //await this.storage.set("Viajes",viajes);
    await this.viajeSer.UpdateViaje(viajes);
    return true;
  }


}
