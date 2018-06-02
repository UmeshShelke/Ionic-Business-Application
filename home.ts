import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import { LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams:NavParams, public modalController:ModalController) {

  }

  openSignatureModel(){
    setTimeout(() => {
       let modal = this.modalController.create(SignaturePage);
    modal.present();
    }, 300);

  }

}