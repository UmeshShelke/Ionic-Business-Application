import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { SignaturePage } from '../signature/signature';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  SignaturePage=SignaturePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geo: Geolocation,private platform: Platform,public modalController:ModalController) {
  
    this.myDate = new Date().toISOString();
    this.generateTopics();
  }
  topics: string[];
  subscription;
  latitude;
  longitude;
  myDate;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    let funct = () => { this.platform.ready().then(() => {
      this.geo.getCurrentPosition().then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.latitude=resp.coords.latitude;
        this.longitude=resp.coords.longitude;
       alert(this.latitude);
      alert(this.longitude);
      }).catch(() => {
        console.log("Error to get location");
      });

    });
 }
this.subscription = Observable.interval(6000).subscribe(x => { 
    funct()
  });

 
}

generateTopics() {
  this.topics = [
    
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5',
    'Task 6',
    'Task 7',
    'Task 8',
  ];
  
}

getTopics(ev: any) {
  this.generateTopics();
  let serVal = ev.target.value;
  if (serVal && serVal.trim() != '') {
    this.topics = this.topics.filter((topic) => {
      return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      
    })
  }
 
}
openSignatureModel(){
  setTimeout(() => {
     let modal = this.modalController.create(SignaturePage);
  modal.present();
  }, 300);

}


}


