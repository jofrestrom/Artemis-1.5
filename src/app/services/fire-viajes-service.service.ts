import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireViajesServiceService {

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  async CrearViaje(viaje: any){
    const docRef = this.fireStore.collection('Viajes').doc(viaje.id);
    const docActual = await docRef.get().toPromise();

    if(docActual?.exists){
      return false;
    }
    await docRef.set({ ...viaje});
    return true;

    //return this.fireStore.collection('Usuarios').doc(usuario.rut).set(usuario);
  }

  getviaje(id: string){
    return this.fireStore.collection('Viajes').doc(id).valueChanges();
  }

  getViajes(){
    return this.fireStore.collection('Viajes').valueChanges()
  }

  UpdateViaje(viaje: any){
    return this.fireStore.collection('Viajes').doc(viaje.id).update(viaje);
  }

  DeleteViaje(id : string){
    return this.fireStore.collection('Viajes').doc(id).delete()
  }

}
