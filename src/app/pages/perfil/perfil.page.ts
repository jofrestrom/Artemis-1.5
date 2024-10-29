import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  infoV: boolean = false;

  miFormulario: FormGroup;
  mostrarInput: boolean = false;

  constructor(private fb: FormBuilder) { 
    this.miFormulario = this.fb.group({
      opcion: [''],
      inputExtra: ['']
    });
  }

  onOpcionChange(opcion: string) {
    this.mostrarInput = opcion === 'Auto';
  }

  usuario: any;

  imagenes: any[] = [];

  ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    console.log(this.usuario)
  }

  async cambio(){
    // Recuperar marca y modelo de localStorage
    const marca = this.usuario.marca;
    const modelo = this.usuario.modelo;
    console.log(marca)
    console.log(modelo)

    // Construir el término de búsqueda
    const searchTerm = `${marca} ${modelo}`;
    const apiKey = 'q1g1kMYPO_ThxX3TnQRhPlt_NjFyKKmJ4UFgijtjcvU'; // Reemplaza con tu clave de API
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Almacenar las imágenes obtenidas
      this.imagenes = data.results.slice(9,10);
      this.infoV = true;
    } catch (error) {
      console.error('Error al buscar imágenes:', error);
    }
  }

  ocultar(){
    this.infoV = false
  }

}
