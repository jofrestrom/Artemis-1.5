import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


import { Storage } from '@ionic/storage-angular';
import { FireServiceService } from './fire-service.service';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private storage: Storage, private alertController: AlertController, private Firebase: FireServiceService) {
    this.init();
   }

   async init(){
    await this.storage.create();
    
    let admin = {
      rut: '12345678-k',
      nombre: 'admin',
      apellido: 'administra',
      correo: 'admin@duocuc.cl',
      password: 'Admin1234.',
      confirmpassword: 'Admin1234.',
      fecha: '2003-01-01',
      genero: 'N/A',
      tipo_user: 'Administrador',
      veiculo: 'NO',
      marca: '',
      patente: '',
      modelo: '',
      canti_acientos: '',
    }

    let Alumno = {
      rut: '21211211-k',
      nombre: 'marcela',
      apellido: 'rosa',
      correo: 'Mar.@duocuc.cl',
      password: 'marcela123.',
      confirmpassword: 'marcela123.',
      fecha: '2003-01-01',
      genero: 'Femenino',
      tipo_user: 'Alumno',
      veiculo: 'NO',
      marca: '',
      patente: '',
      modelo: '',
      canti_acientos: '',
    }

    let conductor = {
      rut: '78787787-7',
      nombre: 'Juanito',
      apellido: 'alimaña',
      correo: 'jano.@duocuc.cl',
      password: 'jano123.',
      confirmpassword: 'jano123.',
      fecha: '2003-01-01',
      genero: 'Masculino',
      tipo_user: 'Conductor',
      veiculo: 'SI',
      marca: 'hyundai',
      patente: 'as-as-12',
      modelo: 'sedan',
      canti_acientos: 4,
    }

    let profesor ={
      rut: '6666666-6',
      nombre: 'Lucy',
      apellido:'Fernanda',
      correo: 'Lucy@profesor.duocuc.cl',
      password: 'lucy123.',
      confirmpassword: 'lucy.',
      fecha: '2003-01-01',
      genero: 'N/A',
      tipo_user: 'Profesor',
      veiculo: 'NO',
      marca: '',
      patente: '',
      modelo: '',
      canti_acientos: '',
    }

    await this.Firebase.CrearUsuario(admin);
    await this.crearUsuario(Alumno);
    await this.crearUsuario(profesor);
    await this.crearUsuario(conductor);
  }

  usuarios:any[] = [];
  user:any[] = [];
  private usuarioAutenticado: any = null;  
  private AlumnoCorreo = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
  private ProfeCorreo = /^[a-zA-Z0-9._%+-]+@profesor\.duocuc\.cl$/;

  public async crearUsuario(usuario:any): Promise<boolean>{
    
    let usuarios: any[] = [];

    this.Firebase.getUsuarios().subscribe(data => {
      usuarios = data
    })

    if(await usuarios.find(user => user.rut === usuario.rut) != undefined){
      return false; 
    }

    if (!this.ProfeCorreo.test(usuario.correo) && !this.AlumnoCorreo.test(usuario.correo)){
      return false; 
    } 
    
    if(this.ProfeCorreo.test(usuario.correo)){
      usuario.tipo_user = "Profesor"
    }

    if(usuario.veiculo === "SI"){
      usuario.tipo_user = "Conductor"
    }

    //console.log(JSON.stringify(usuario));
    usuarios.push(usuario);
    this.Firebase.CrearUsuario(usuario);
    //await this.storage.set("Usuarios", usuarios);
    return true;    
  }

  public async inicio(correo: string, contrasena: string): Promise<any>{
    
    const auth = getAuth();
    
    const userCredential = await signInWithEmailAndPassword(
      auth,
      correo,
      contrasena
    );
    
    const user = userCredential.user;
    
    
    const uid = user.uid;
    console.log('Usuario autenticado con UID:', uid);

    const userData = await this.Firebase.getUsuarioUid(uid);
  
    if(userData){
      console.log("hola");
      
    }

    this.Firebase.getUsuarios().subscribe(data => {
      this.user = data
    })
    const usuario = this.user.find(user => user.correo === correo && user.password === contrasena);
    if (usuario) {
      this.usuarioAutenticado = usuario
      localStorage.setItem("usuario", JSON.stringify(this.usuarioAutenticado));
      return true;
    }
    return false;


  }
  public async EliminarUsuario(rut: string): Promise<boolean>{
    this.Firebase.getUsuarios().subscribe(data => {
      this.user = data
    })

    let usuarios = this.user;
    
    console.log(this.user);
    let indice = usuarios.findIndex(elemento => elemento.rut === rut);
    if (indice === -1) {
      return false;
    }
    usuarios.splice(indice, 1);
    await this.storage.set("Usuarios", usuarios);
    
    await this.presentAlert("EXITO", "usuario eliminado con exito")
    return true;
  }

  public async getUsuario(rut: string){ 
    return this.Firebase.getUsuario(rut)
  }
  
  public async getUsuarios(){
    let usuarios = this.Firebase.getUsuarios()
    return usuarios
  }

  public async ActualizarUsuario(rut: string, nuevoUsuario: any) {
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    console.log("rut:",rut)
    let indice = usuarios.findIndex(elemento => elemento.rut === rut);
    console.log("indice:",indice)
    if (indice === -1) {
      return false;
    }
    if (!this.ProfeCorreo.test(nuevoUsuario.correo) && !this.AlumnoCorreo.test(nuevoUsuario.correo)){
      return false;
    }
    if(this.ProfeCorreo.test(nuevoUsuario.correo)){
      nuevoUsuario.tipo_user = "Profesor"
    }
    if(nuevoUsuario.veiculo === "SI"){
      nuevoUsuario.tipo_user = "Conductor"
    }
    if(nuevoUsuario.veiculo === "NO"){
      nuevoUsuario.tipo_user = "Alumno"
    }
    usuarios[indice] = nuevoUsuario;
    await this.storage.set("Usuarios", usuarios);
    return true;
  }
  public getUsuarioValido() {
    return this.usuarioAutenticado;
  }

  public async validarpassword(contra: string, confirmar: string){
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    const Contra2 = usuarios.find(Cont => Cont.password === contra && Cont.confirmpassword === confirmar);
    return Contra2;
  }

  public async recuperar(correo:string){
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    return usuarios.find(elemento=> elemento.correo == correo);
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
