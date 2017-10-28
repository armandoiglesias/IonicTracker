import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:any={};

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController
    , private _ubiService:UbicacionProvider) {

    this._ubiService.iniciarLocalizacion();

    this._ubiService.usuario.valueChanges().subscribe(data => {
      console.log(data);
      this.usuario = data;
    });
  }

  salir(){
    this._ubiService.detenerLocalizacion();
    this.navCtrl.setRoot(LoginPage);
  }

}
