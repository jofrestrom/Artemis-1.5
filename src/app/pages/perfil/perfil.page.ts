import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  infoV: boolean = false;
  listarUser: boolean = false;

  miFormulario: FormGroup;
  mostrarInput: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,private navController: NavController,private alertController: AlertController) { 
    this.miFormulario = this.fb.group({
      opcion: [''],
      inputExtra: ['']
    });
  }

  onOpcionChange(opcion: string) {
    this.mostrarInput = opcion === 'Auto';
  }

  usuario: any;
  usuarios: any;

  imagenes: any[] = [];
  img: any;

  async ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.usuarios = await this.usuarioService.getUsuarios();
    console.log(this.usuario)
  }

  async mostrarInfo(){
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
      this.imagenes = data.results.slice(0,1);
      this.infoV = true;
    } catch (error) {
      console.error('Error al buscar imágenes:', error);
    }
  }

  ocultar(){
    this.infoV = false;
  }
  
  ocultarUser(){
    this.listarUser = false;
  }

  async listarUsers(){
    this.listarUser = true;
  }
  close(rut: string){
    this.presentAlertClose(rut)
  }

  async presentAlertClose(user: string) {
    const alert = await this.alertController.create({
      header: '¿Porque te vas?',
      message: `¿Estás seguro de que te quieres ir??`,
      buttons: [
        {
          text: 'Na, era mentira me quedo',
          role: 'cancel',
        },
        {
          text: 'Chao, no vimo',
          handler: () => {
            localStorage.removeItem('usuario');            
            this.usuarios = this.usuarioService.getUsuarios(); // Actualiza la lista de usuarios
            this.navController.navigateRoot('/inicio-sesion');
          },
        },
      ],
    });

    await alert.present();
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

}
