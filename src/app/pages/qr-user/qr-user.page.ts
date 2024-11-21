import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-user',
  templateUrl: './qr-user.page.html',
  styleUrls: ['./qr-user.page.scss'],
})
export class QRUserPage implements OnInit {

  constructor() { }

  usuario: any;



  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
  }

}
