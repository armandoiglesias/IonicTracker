import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular'



@Injectable()
export class UsuarioProvider {

  clave:string = null;

  constructor(private afDB: AngularFireDatabase
    , private storage: Storage
    , private platform: Platform) {
    console.log('Hello UsuarioProvider Provider');
  }

  verificarUsuario(clave: string) {

    clave = clave.toLowerCase();
    let promesa = new Promise((resolve, reject) => {

      this.afDB.list("/usuarios/" + clave).valueChanges()
        .subscribe(data => {

          if (data.length == 0) {
            resolve(false);

          } else {
            this.clave = clave;
            this.guardarStorage();

            resolve(true);
          }

        });


    }).catch(error => console.error("Error en PromesaService " + JSON.stringify(error)));

    return promesa;

  }

  guardarStorage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        this.storage.set('clave', this.clave);
      } else {

        if (!localStorage.getItem("clave")) {
          localStorage.setItem("clave", JSON.stringify(this.clave));
        } else {
          localStorage.removeItem("clave");
        }

      }

    });

    return promesa;

  }

  cargarStorage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready().then(() => {

          this.storage.get('clave').then((val) => {
            this.clave = val;
            resolve();
          });

        });
      }
      else {
        if (localStorage.getItem("clave")) {
          this.clave = JSON.parse( localStorage.getItem("clave") ) ;
        }
        else {
          this.clave = null;
        }

        resolve();


      }
    });

    return promesa;
  }

  borrarUsuario(){
    this.clave = null;
    this.guardarStorage();
  }

}
