import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private storage: Storage, private alertController: AlertController) {
    this.init();
   }

   async init(){
    await this.storage.create();
    
    let admin = {
      rut: '12345678-k',
      nombre: 'admin',
      apellido: 'administra',
      correo: 'admin@duocuc.cl',
      password: 'admin1234.',
      confirmpassword: 'admin1234.',
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
      marca: 'Hunday',
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

    await this.crearUsuario(admin);
    await this.crearUsuario(Alumno);
    await this.crearUsuario(profesor);
    await this.crearUsuario(conductor);
  }

  private usuarioAutenticado: any = null;  
  private AlumnoCorreo = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
  private ProfeCorreo = /^[a-zA-Z0-9._%+-]+@profesor\.duocuc\.cl$/;

  public async crearUsuario(usuario:any): Promise<boolean>{
    
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    
    if(usuarios.find(user => user.rut === usuario.rut) != undefined){
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

    console.log(JSON.stringify(usuario));
    usuarios.push(usuario);
    await this.storage.set("Usuarios", usuarios);
    return true;    
  }
  public async inicio(correo: string, contrasena: string): Promise<any>{
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    const usuario = usuarios.find(user => user.correo === correo && user.password === contrasena);
    if (usuario) {
      this.usuarioAutenticado = usuario
      localStorage.setItem("usuario", JSON.stringify(this.usuarioAutenticado));
      return true;
    }
    return false;
  }

  public async EliminarUsuario(rut: string): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
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
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    return usuarios.find(user =>user.rut === rut)
  }
  
  public async getUsuarios(){
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
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
  
  public async Iniciar_sesion(correo: string, password: string): Promise<boolean> {
    let usuarios: any[] = await this.storage.get("Usuarios") || [];
    const usuario = usuarios.find(user => user.correo === correo && user.password === password);
    if (usuario) {
      this.usuarioAutenticado = usuario;
      localStorage.setItem("Usuario", JSON.stringify(this.usuarioAutenticado));
      return true;
    }
    return false;
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
