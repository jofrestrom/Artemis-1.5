import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  
  constructor(private router: Router, private usuarioService: UsuarioService, private userFire: FireServiceService,
    private alertController: AlertController, 
    private fireAuth: AngularFireAuth 
  ) {
    
  }
  
  
  ngOnInit() {
  }
  
  correo: string = '';
  password: string = '';
  
  async login(){
    
    const auth = getAuth();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      this.correo,
      this.password
    );

    // Usuario autenticado
    const user = userCredential.user;
    const uid = user.uid;
    console.log('Usuario autenticado con UID:', uid);

    const userData = await this.userFire.getUsuarioUid(uid);

    console.log(userData);
    
    if (userData) {
      if(await this.usuarioService.inicio(this.correo, this.password)){
        await this.mostrarAlerta(
          'Inicio de sesión exitoso',
          'welcome to Artemis'
        );
        this.router.navigate(['/home']);
      }else{
        alert("CORREO O CONTRASEÑA INCORRECTO")

      }
      }
  }
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

}
