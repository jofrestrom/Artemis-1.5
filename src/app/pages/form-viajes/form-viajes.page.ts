import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as L from 'leaflet';
import * as G from 'leaflet-control-geocoder';

import 'leaflet-routing-machine';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

import * as uuid from 'uuid';


@Component({
  selector: 'app-form-viajes',
  templateUrl: './form-viajes.page.html',
  styleUrls: ['./form-viajes.page.scss'],
})
export class FormViajesPage implements OnInit {
  
  viaje = new FormGroup({
    id: new FormControl('',[Validators.required]),
    conductor: new FormControl('', [Validators.required]),
    asientos: new FormControl( [Validators.required]),
    precio: new FormControl( [Validators.required]),
    destino: new FormControl('',[Validators.required]),
    latit: new FormControl( [Validators.required]),
    longit: new FormControl( [Validators.required]),
    metros_distancia: new FormControl( [Validators.required]),
    minutos: new FormControl(),
    estado: new FormControl('pendiente'),
    pasajeros: new FormControl([])
  });
  
  usuario: any;
  
  viajes: any[] = [];
  private mapa: L.Map | undefined;
  private geocoder: G.Geocoder | undefined;
  latitud: number = 0;
  longitud: number = 0;
  direccion: string = "";
  distancia_metros: number = 0;
  tiempo_segundos: number = 0;
  
  
  constructor( private ViajeServices: ViajeService,  private usuarioService: UsuarioService) { }
  
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.initMap();
  }
  initMap(){
    try {
      //ACA CARGAMOS E INICIALIZAMOS EL MAPA:
      //this.mapa = L.map("map_html").locate({setView:true, maxZoom:16});
      this.mapa = L.map("map_html").setView([-33.59844843494428, -70.57879355897805],19);
      
      //ES LA PLANTILLA PARA QUE SEA VEA EL MAPA:
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.mapa);
  
      this.geocoder = G.geocoder({
        placeholder: "Ingrese dirección a buscar",
        errorMessage: "Dirección no encontrada"
      }).addTo(this.mapa);

      this.geocoder.on('markgeocode', (e)=>{
        let lat = e.geocode.properties['lat'];
        let lon = e.geocode.properties['lon'];
        this.viaje.controls.destino.setValue(e.geocode.properties['display_name']);
        
        this.viaje.controls.id.setValue(uuid.v4());
        this.viaje.controls.latit.setValue(lat);
        this.viaje.controls.longit.setValue(lon);
        console.log(this.viaje.value);

        if(this.mapa){
          L.Routing.control({
            waypoints: [L.latLng(-33.608552227594245, -70.58039819211703),
              L.latLng(lat,lon)],
              fitSelectedRoutes: true,
            }).on('routesfound', (e)=>{
              this.viaje.controls.metros_distancia.setValue(e.routes[0].summary.totalDistance);
              this.viaje.controls.minutos.setValue(Math.round(e.routes[0].summary.totalTime/60));
          }).addTo(this.mapa);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  async crear(){

    const nombreCondu = this.usuario.nombre + ' ' + this.usuario.apellido
    this.viaje.controls.conductor.setValue(nombreCondu);
    
    if(await this.ViajeServices.CrearViaje(this.viaje.value)){
      console.log(this.viaje.value);
      alert("creado con exito")
    }
  }


}
