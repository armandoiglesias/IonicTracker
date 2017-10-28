import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {  NavController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { HomePage} from '../home/home';

import {  UsuarioProvider} from '../../providers/usuario/usuario'



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

  clave:string = "";
  
  ngAfterViewInit() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
    
  }

   @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController
    , public _usuarioService:UsuarioProvider
    , private loadingCtr: LoadingController
    , private alertCtrl: AlertController
    ) {

      
  }



  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  continuar(){

    let loading = this.loadingCtr.create({
      content : "Espere..."
    })

    loading.present();


    this._usuarioService.verificarUsuario(this.clave)
      .then(valido => {
        loading.dismiss();
        if(valido){
          this.slides.lockSwipes(false);
          this.slides.slideNext();
          this.slides.lockSwipes(true);


        }
        else{
          this.alertCtrl.create({
            title: "Clave Errada"
            , buttons: ["Aceptar"]
          }).present();
        }
      }).catch(error => {
        loading.dismiss();
        console.error("Error al verificar " + JSON.stringify(error));
      });
        
  }

  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

}
