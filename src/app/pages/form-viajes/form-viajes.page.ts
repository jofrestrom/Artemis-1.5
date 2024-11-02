import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-viajes',
  templateUrl: './form-viajes.page.html',
  styleUrls: ['./form-viajes.page.scss'],
})
export class FormViajesPage implements OnInit {
  
  viaje = new FormGroup({
    id: new FormControl(),
    conductor: new FormControl(),
    asientos: new FormControl(),
    precio: new FormControl(),
    latit: new FormControl(),
    longit: new FormControl(),
    metros_distancia: new FormControl(),
    minutos: new FormControl(),
    estado: new FormControl(),
    pasajeros: new FormControl([])
  });

  Usuarios: any;

  viajes: any[] = [];

  latitud: number = 0;
  longitud: number = 0;
  direccion: string = "";
  distancia_metros: number = 0;
  tiempo_segundos: number = 0;


  constructor() { }

  ngOnInit() {
  }

}
