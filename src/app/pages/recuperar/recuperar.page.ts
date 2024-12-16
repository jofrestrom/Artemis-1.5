import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string = '';
  
  constructor(private router: Router, private usuarioService: UsuarioService,
              private alertController: AlertController, public afAuth: AngularFireAuth,
              private firebase: FireServiceService) 
  { }

  ngOnInit() {
  }

  async enviar(correo: string){
    this.firebase.recuperarContrasena(correo)
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message ,
      buttons: ['ok'],
    });
    await alert.present();
  }

}
