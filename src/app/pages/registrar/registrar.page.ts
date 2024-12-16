import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  enviado = false;
  animarIcono = false;

  miFormulario: FormGroup;
  mostrarInput: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,private router: Router, 
              private alertController: AlertController) { 
    this.miFormulario = this.fb.group({
      opcion: [''],
      inputExtra: ['']
    });
  }

  onOpcionChange(opcion: string) {
    this.mostrarInput = opcion === 'SI';
  }

  ngOnInit() {
  }

  persona = new FormGroup ({
    nombre: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    apellido: new FormControl('', [Validators.maxLength(10), Validators.minLength(4),Validators.required]),
    rut: new FormControl('', [Validators.maxLength(10), Validators.minLength(9),Validators.required, this.validarRut()]),
    correo: new FormControl('',[Validators.minLength(4),Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@duocuc.cl) || [a-zA-Z0-9.]+(@profesor.duoc.cl)")]),
    fecha: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.maxLength(10), Validators.minLength(4)]),
    confi_password: new FormControl('',[Validators.maxLength(10), Validators.minLength(4)]),
    genero: new FormControl(Validators.required),
    tipo_user: new FormControl('Alumno'),
    veiculo: new FormControl('',[Validators.required]),
    marca: new FormControl(),
    modelo: new FormControl(),
    patente: new FormControl(''),
    canti_acientos: new FormControl(),
  })


  validad_edad(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - fecha.getFullYear();
      const monthDiff = today.getMonth() - fecha.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < fecha.getDate())) {
        age--;
      }

      return (age >= minAge && age <= maxAge) ? null : { 'invalidAge': true };
    };
  }
  
  validarRut(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      if (!rut) return { isValid: false };
      const dv_validar = rut?.replace("-", "").split("").splice(-1).reverse()[0];
      let rut_limpio = [];
      if (rut?.length == 10) {
        rut_limpio = rut?.replace("-", "").split("").splice(0, 8).reverse();
      } else {
        rut_limpio = rut?.replace("-", "").split("").splice(0, 7).reverse() || [];
      }
      let factor = 2;
      let total = 0;
      for (let num of rut_limpio) {
        total = total + +num * factor;
        factor = factor + 1;
        if (factor == 8) {
          factor = 2;
        }
      }
      let dv = (11 - (total % 11)).toString();
      if (+dv >= 10) {
        dv = "k";
      }
      if (dv_validar != dv.toString()) return { isValid: false };
      return null;
    };
  }

  async registrar() {
    

    if(this.persona.controls.password.value != this.persona.controls.confi_password.value){
      await this.presentAlert('Problema', 'las contraseñas no coinsiden');
    }else if ( await this.usuarioService.crearUsuario(this.persona.value)){
      await this.presentAlert('Perfecto', 'Registrado correctamente');
      this.persona.reset();
      await this.usuarioService.getUsuarios();
      this.router.navigate(['/inicio-sesion']);  
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

  enviarCorreo() {
    this.enviado = false;
    this.animarIcono = true;

    setTimeout(() => {
      this.animarIcono = false;
      this.enviado = true;
    }, 2000);
  }
  validarPatenteChilena() {
    return (control: AbstractControl): ValidationErrors | null => {
      const patentePattern = /^[A-Z]{2}[0-9]{4}$|^[A-Z]{4}[0-9]{2}$/;
      const esValida = patentePattern.test(control.value?.toUpperCase());
      return esValida ? null : { patenteInvalida: true };
    };
  }

}
