import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    id: new FormControl('', [Validators.required]),
    conductor: new FormControl('', [Validators.required]),
    asientos: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    destino: new FormControl('', [Validators.required]),
    latit: new FormControl('', [Validators.required]),
    longit: new FormControl('', [Validators.required]),
    metros_distancia: new FormControl('', [Validators.required]),
    minutos: new FormControl(),
    hora_salida: new FormControl(),
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
  hora: any;
  
  constructor(private ViajeServices: ViajeService, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.initMap();
  }

  initMap() {
    try {
      this.mapa = L.map("map_html").setView([-33.59844843494428, -70.57879355897805], 19);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.mapa);
  
      this.geocoder = G.geocoder({
        placeholder: "Ingrese dirección a buscar",
        errorMessage: "Dirección no encontrada"
      }).addTo(this.mapa);

      this.geocoder.on('markgeocode', (e) => {
        let lat = e.geocode.properties['lat'];
        let lon = e.geocode.properties['lon'];
        this.viaje.controls.destino.setValue(e.geocode.properties['display_name']);
        this.viaje.controls.id.setValue(uuid.v4());
        this.viaje.controls.latit.setValue(lat);
        this.viaje.controls.longit.setValue(lon);

        if (this.mapa) {
          L.Routing.control({
            waypoints: [
              L.latLng(-33.608552227594245, -70.58039819211703),
              L.latLng(lat, lon)
            ],
            fitSelectedRoutes: true,
          }).on('routesfound', (e) => {
            this.viaje.controls.metros_distancia.setValue(e.routes[0].summary.totalDistance);
            this.viaje.controls.minutos.setValue(Math.round(e.routes[0].summary.totalTime / 60));
          }).addTo(this.mapa);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  //validarHoraSalida(horaSeleccionada: string): boolean {
  //  const horaActual = new Date();
  //  const [hora, minuto] = horaSeleccionada.split(':').map(Number);
  //  const horaSalida = new Date();
  //  horaSalida.setHours(hora, minuto, 0, 0);
//
  //  return horaSalida >= horaActual;
  //}

  async crear() {
    const nombreCondu = this.usuario.nombre + this.usuario.apellido;
    this.viaje.controls.conductor.setValue(nombreCondu);

    //const horaSeleccionada = this.viaje.get('hora_salida')?.value;
//
    //if (!horaSeleccionada || !this.validarHoraSalida(horaSeleccionada)) {
    //  console.log("Hora inválida: debe ser mayor o igual a la hora actual.");
    //  alert("La hora seleccionada debe ser mayor o igual a la hora actual.");
    //  return;
    //}
//
    //const horaFormat = new Date(horaSeleccionada).toLocaleTimeString('es-ES');
    //this.viaje.controls.hora_salida.setValue(horaFormat);

    
    if (this.viaje.valid) {
      if(await this.ViajeServices.CrearViaje(this.viaje.value)){
        console.log("Viaje creado:", this.viaje.value);
        this.viaje.reset();
        await this.ViajeServices.getViajes();
        
      this.router.navigate(['/home/viajes']); 
      }
      // Aquí puedes agregar la lógica para guardar el viaje.
    } else {
      console.log("Formulario inválido:", this.viaje.errors)
    }
  }
}
