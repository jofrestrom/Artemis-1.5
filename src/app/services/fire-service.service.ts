import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private fireStore: AngularFirestore ) { }

  async CrearUsuario(usuario: any){
    const docRef = this.fireStore.collection('Usuarios').doc(usuario.rut);
    const docActual = await docRef.get().toPromise();

    if(docActual?.exists){
      return false;
    }

    await docRef.set(usuario);
    return true;

    //return this.fireStore.collection('Usuarios').doc(usuario.rut).set(usuario);
  }

  getUsuario(rut: string){
    return this.fireStore.collection('Usuarios').doc(rut).valueChanges();
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
