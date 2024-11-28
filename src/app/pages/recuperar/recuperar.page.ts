import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string = '';
  
  constructor(private router: Router, private usuarioService: UsuarioService,
              private alertController: AlertController, public afAuth: AngularFireAuth) 
  { }

  ngOnInit() {
  }

  async enviar(correo: string){
    if(await this.usuarioService.recuperar(this.correo)){
      await this.presentAlert("Bien", 'correo enviado a ' + this.correo)
      this.router.navigate(['/inicio-sesion'])
    }else{
      await this.presentAlert("ERROR", 'No se a encontrado el correo ingresado')
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message ,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

}
