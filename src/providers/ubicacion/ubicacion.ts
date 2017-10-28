import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { UsuarioProvider} from '../usuario/usuario'


@Injectable()
export class UbicacionProvider {

   usuario: AngularFireObject<any[]>;
   private watch : any = null;

  constructor(private geolocation: Geolocation
    ,private  afDB: AngularFireDatabase
    , private _usuarioService:UsuarioProvider) {
    console.log('Hello UbicacionProvider Provider');

    if (!this._usuarioService.clave)
        return;

    this.usuario = this.afDB.object('/usuarios/' + this._usuarioService.clave );

  }

  iniciarLocalizacion() {

    this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

      if (!this._usuarioService.clave)
        return;

      console.log(this._usuarioService.clave);

        this.usuario.update({ lat: data.coords.latitude, lng : data.coords.longitude});
      //this.usuario = this.afDB.list('cuisines').valueChanges();
    });

  }

  detenerLocalizacion(){
    this.watch.unsubscribe();
  }

}
