import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { stringify } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private storage: Storage) {

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
      asientos: '4',
      precio: '2000',
      destino: 'jose covarrubias',
      latit: '-33.61955417047049 ',
      longit: '-70.56958938663026',
      metros_distancia: '3200',
      minutos: '10',
      estado: 'pendiente',
      pasajeros: [],
      };
    this.CrearViaje(viaje1);
  }
  public async CrearViaje(viaje: any): Promise<boolean>{
    let Viajes: any[] = await this.storage.get("Viajes") || [];
    
    if(Viajes.find(v => v.id == viaje.id) != undefined){
      return false;
    }
    

    Viajes.push(viaje);
    await this.storage.set("Viajes", Viajes)
    return true
  }

  //async buscarids():Promise<any>{
  //  const viajes: any[] = await this.storage.get("Viajes") || [];
  //  console.log("mis viajes",viajes[0].id);
  //  return viajes[0].id;
  //}

  async buscarViajeP(rut: string):Promise<boolean>{
    const viajes: any[] = await this.storage.get("Viajes") || [];
    
    const viaje = viajes.find(v=> v.id);
    if(rut == viaje.pasajeros.rut ){
      console.log("hola");
      const pasajeros = viaje.pasajeros;
      for(let p of pasajeros){
        console.log(p);
        if(p.rut == rut){
          console.log("se enconto un pasajero: ", p.rut);
          return true; 
        }
      }
    }

    console.log("no se encontro en un viaje");
    

    return false; // Si no se encuentra, devolver null
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

  public async getViajes(): Promise<any []>{
    return await this.storage.get("Viajes");
  }

  public async getviaje(id :string):Promise <any>{
    let viajes: any[] = await this.storage.get("Viajes") || [];
    console.log("viaje a tomar: ", viajes);
    return viajes.find(v => v.id == id)

  }

  public async actualizar_viaje(id: string, pasajero: any): Promise<boolean>{
    let viajes: any[] = await this.storage.get("Viajes") || [];
    let indice: number = viajes.findIndex(v => v.id==id);
    if(indice==-1){
      return false;
    }
    if(viajes[indice].pasajeros.find((pasajero: any) => pasajero.rut == pasajero.rut)){
      return false;
    }
    viajes[indice].pasajeros.push(pasajero);
    viajes[indice].asientos_disp = viajes[indice].asientos_disp - 1;
    await this.storage.set("Viajes",viajes);
    return true;
  }


}
