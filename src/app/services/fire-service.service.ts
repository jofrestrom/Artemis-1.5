import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService{

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth,
    private alertController: AlertController) { }

  async CrearUsuario(usuario: any){
    const docRef = this.fireStore.collection('Usuarios').doc(usuario.rut);
    const docActual = await docRef.get().toPromise();

    if(docActual?.exists){
      return false;
    }
    
    if(!usuario.correo.includes("[a-zA-Z0-9.]+(@duocuc.cl) || [a-zA-Z0-9.]+(@profesor.duoc.cl)")){
      return false
    }
    const authuser = await this.fireAuth.createUserWithEmailAndPassword(usuario.correo,usuario.password);
    const idUser = authuser.user?.uid
    await docRef.set({ ...usuario,idUser});
    return true;

    //return this.fireStore.collection('Usuarios').doc(usuario.rut).set(usuario);
  }

  getUsuario(rut: string){
    return this.fireStore.collection('Usuarios').doc(rut).valueChanges();
  }

  getUsuarioUid(uid: string): Promise<any>{
    return this.fireStore.collection('usuarios', ref => ref.where('uid', '==', uid)).get().toPromise().then((snapshot) => {
      if (snapshot && !snapshot.empty){
        return snapshot.docs[0].data();
      }
      return null;
    }).catch((error) => {
      console.error("Error al obtener usuario:", error);
      return null;
    })
  }

  async recuperarContrasena(email: string): Promise<void> {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado un correo para restablecer tu contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: this.obtenerMensajeError(error.code),
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  private obtenerMensajeError(codigo: string): string {
    switch (codigo) {
      case 'auth/user-not-found':
        return 'No existe un usuario con este correo.';
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      default:
        return 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }

  getUsuarios(){
    return this.fireStore.collection('Usuarios').valueChanges()
  }

  UpdateUsuario(usuario: any){
    return this.fireStore.collection('Usuarios').doc(usuario.rut).update(usuario);
  }

  DeleteUsuario(rut : string){
    return this.fireStore.collection('Usuarios').doc(rut).delete()
  }

}
