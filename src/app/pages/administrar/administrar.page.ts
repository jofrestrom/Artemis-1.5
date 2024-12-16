import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  constructor(private usuarioService: UsuarioService,private router: Router, 
    private alertController: AlertController, private Firebase: FireServiceService, private navController: NavController) { 
      this.Usuario.get("rut")?.setValidators([Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),this.validarRut()]);
    }
   

  async ngOnInit() {
    this.cargarUsuarios()
    //this.Usuarios = await this.usuarioService.getUsuarios();
  }

  Usuario = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    apellido: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    rut: new FormControl('', [Validators.maxLength(10), Validators.minLength(9),Validators.required]),
    correo: new FormControl('',[Validators.minLength(4),Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@duocuc.cl) || [a-zA-Z0-9.]+(@profesor.duocuc.cl)")]),
    fecha: new FormControl('', Validators.required),
    genero: new FormControl(Validators.required),
    tipo_user: new FormControl('Alumno'),
    veiculo: new FormControl('',[Validators.required]),
    marca: new FormControl(),
    modelo: new FormControl(),
    patente: new FormControl(),
    canti_acientos: new FormControl()
    
  })
  Usuarios: any;
  botonModificar: boolean = true;
  
  async buscar(usuario: any){
    this.Usuario.setValue(usuario);
    this.botonModificar = false;
  }

  async eliminar(rut: string) {
    this.presentAlertDelete(rut)
  }
  
  validarRut():ValidatorFn{
    return () => {
      const rut = this.Usuario.controls.rut.value;
      const dv_validar = rut?.replace("-","").split("").splice(-1).reverse()[0];
      let rut_limpio = [];
      if(rut?.length==10){
        rut_limpio = rut?.replace("-","").split("").splice(0,8).reverse();
      }else{
        rut_limpio = rut?.replace("-","").split("").splice(0,7).reverse() || [];
      }
      let factor = 2;
      let total = 0;
      for(let num of rut_limpio){
        total = total + ((+num)*factor);
        factor = factor + 1;
        if(factor==8){
          factor = 2;
        }
      }
      var dv = (11-(total%11)).toString();
      if(+dv>=10){
        dv = "k";
      }
      if(dv_validar!=dv.toString()) return {isValid: false};
      return null;
    };
  }
  validarEdad18(fecha_nacimiento: string){
    var edad = 0;
    if(fecha_nacimiento){
      const fecha_date = new Date(fecha_nacimiento);
      const timeDiff = Math.abs(Date.now() - fecha_date.getTime());
      edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(edad>=18){
      return true;
    }else{
      return false;
    }
  }


  async registrar() {
    
    if ( await this.Firebase.CrearUsuario(this.Usuario.value)){
      await this.presentAlert('Perfecto', 'Registrado correctamente');
      this.Usuario.reset();
      this.Firebase.getUsuarios();
      this.router.navigate(['/home']);  
    } else {
      await this.presentAlert('Error', 'El usuario no se pudo registrar');
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
  cargarUsuarios(){
    this.Firebase.getUsuarios().subscribe(data=>{
      this.Usuarios = data;
    });
  }
  async modificar(){
    this.Firebase.UpdateUsuario(this.Usuario.value).then(()=>{
      alert("USUARIO MODIFICADO!");
      this.Usuario.reset();
    }).catch(error=>{
      console.log("ERROR: " + error);
    });
  }
  async presentAlertDelete(user: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar a ${this.Usuarios.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.Firebase.DeleteUsuario(user)
            this.Firebase.getUsuarios();           // Actualiza la lista de usuarios
            this.navController.navigateRoot('/home');
          },
        },
      ],
    });
  }
}