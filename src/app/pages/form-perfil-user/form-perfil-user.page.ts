import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-perfil-user',
  templateUrl: './form-perfil-user.page.html',
  styleUrls: ['./form-perfil-user.page.scss'],
})
export class FormPerfilUserPage implements OnInit {

  
  mostrarInput: boolean = false;
  miFormulario: FormGroup;

  constructor(private usuarioService: UsuarioService,private router: Router,private fb: FormBuilder, 
    private alertController: AlertController, private navController: NavController) {  

      this.miFormulario = this.fb.group({
        opcion: [''],
        inputExtra: ['']
      });   
  }
  
  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.Usuario.patchValue(this.usuario);
  }

  onOpcionChange(opcion: string) {
    this.mostrarInput = opcion === 'SI';
  }


  Usuario = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    apellido: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    rut: new FormControl('', [Validators.maxLength(10), Validators.minLength(9),Validators.required]),
    correo: new FormControl('',[Validators.minLength(4),Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@duocuc.cl) || [a-zA-Z0-9.]+(@profesor.duocuc.cl)")]),
    fecha: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.maxLength(10), Validators.minLength(4)]),
    confirmpassword: new FormControl('',[Validators.maxLength(10), Validators.minLength(4)]),
    genero: new FormControl(Validators.required),
    tipo_user: new FormControl('Alumno'),
    veiculo: new FormControl('',[Validators.required]),
    marca: new FormControl(),
    modelo: new FormControl(),
    patente: new FormControl(),
    canti_acientos: new FormControl()
  })

  usuario: any;
  usuarios: any;


  async eliminarCuenta(rut: string) {
    
    this.presentAlertDelete(rut);

  }
  
  async modificar() {
    var rut_modificar = this.Usuario.controls.rut.value || "";
    if (await this.usuarioService.ActualizarUsuario(rut_modificar, this.Usuario.value)) {
      this.presentAlert('Perfecto!', 'Modificado correctamente');
      this.navController.navigateRoot('/home');
    } else {
      this.presentAlert('Error!', 'No se pudo modificar');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

  async presentAlertDelete(user: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar a ${this.usuario.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.usuarioService.EliminarUsuario(user);
            localStorage.removeItem('usuario');            
            this.usuarios = this.usuarioService.getUsuarios(); // Actualiza la lista de usuarios
            this.navController.navigateRoot('/inicio-sesion');
          },
        },
      ],
    });

    await alert.present();
  }
}