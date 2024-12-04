import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  persona = new FormGroup({    
      correo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private usuarioService: UsuarioService, private viajeSer: ViajeService) {
    
  }

  ngOnInit() {
  }

  async login(){

    const correo = this.persona.value.correo
    const password = this.persona.value.password

    if(await this.usuarioService.inicio(correo, password)){
      this.router.navigate(['/home']);
    }else{
      alert("CORREO O CONTRASEÑA INCORRECTO")
    }
  }

}
