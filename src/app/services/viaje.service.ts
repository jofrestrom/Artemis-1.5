import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private storage: Storage) { }

  usuario: any;

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


}
