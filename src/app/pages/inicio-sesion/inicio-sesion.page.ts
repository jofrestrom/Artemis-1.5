import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  correo: string = '';
  password: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {
    
   }

  ngOnInit() {
  }

  async login(){
    if(await this.usuarioService.inicio(this.correo, this.password)){
      this.router.navigate(['/home']);
    }else{
      alert("CORREO O CONTRASEÑA INCORRECTO")
    }
  }

}
