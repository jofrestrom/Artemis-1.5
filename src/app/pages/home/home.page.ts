import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  usuario: any;

  ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
  }

 
}
