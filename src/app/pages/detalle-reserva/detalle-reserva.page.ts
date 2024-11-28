import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NavController } from '@ionic/angular';
import * as G from 'leaflet-control-geocoder';


@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.page.html',
  styleUrls: ['./detalle-reserva.page.scss'],
})
export class DetalleReservaPage implements OnInit {
  usuario: any;
  private map: L.Map | undefined;
  private geocoder: G.Geocoder | undefined;
  latitud: number = 0;
  longitud: number = 0;
  direccion: string = "";
  distancia_metros: number = 0;
  tiempo_segundos: number = 0;
  id: string = "";
  viaje: any = {};

  constructor(private activatedRoute: ActivatedRoute, private viajeService: ViajeService, private navController: NavController) { }

  async ngOnInit() { 
    this.id = this.activatedRoute.snapshot.paramMap.get("id") || "";
    this.viaje = await this.viajeService.getviaje(this.id);
    
    console.log("viaje ", this.viaje) 
    this.initMap();
  }

  initMap() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    this.map = L.map("map").setView([-33.59837122676798, -70.57877634597855], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Define los puntos de ruta con origen y destino
    L.Routing.control({
      waypoints: [
        L.latLng(-33.608552227594245, -70.58039819211703), // Coordenadas de inicio
        L.latLng(this.viaje.latit, this.viaje.longit) // Coordenadas de destino
      ],
      fitSelectedRoutes: true,
      show: false,
    }).addTo(this.map);
  }
  async tomar_viaje() {
    var usuario = JSON.parse(localStorage.getItem('usuario') || '');
    console.log("Usuario en localStorage:", usuario);
  
    var pasajero = {
      "rut": usuario.rut
    };
  
    if(await this.viajeService.actualizar_viaje(this.id, pasajero)){
      alert("Viaje tomado con éxito!");
      console.log(pasajero.rut);
      
      this.navController.navigateRoot("/home");
    }else{
      alert("ERROR! ya eres pasajero!");
    }
  }

}
