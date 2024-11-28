import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService{

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  async CrearUsuario(usuario: any){
    const docRef = this.fireStore.collection('Usuarios').doc(usuario.rut);
    const docActual = await docRef.get().toPromise();

    if(docActual?.exists){
      return false;
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

  getCorreo(correo: string){
    return this.fireStore.collection('Usuarios').doc(correo).valueChanges();
  }

  getpassword(password: string){
    return this.fireStore.collection('Usuarios').doc(password).valueChanges();
  }

  validacion(correo: string, password: string){
    let email = this.fireStore.collection('Usuarios').doc(correo).valueChanges();
    let pass = this.fireStore.collection('Usuarios').doc(password).valueChanges();


    
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
