import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-entrance',
  templateUrl: 'entrance.html'
})
export class EntrancePage {
  username: string;
  error: string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
  onClickSignin() {
    if ( this.username ) {
      this.navCtrl.push( LobbyPage );
    }
    else {
      // this.showErrorInputUsername();
      let alert = this.alertCtrl.create({
      title: 'Form Error!',
        subTitle: 'Your username input is empty!',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  showErrorInputUsername() {
    this.error = "Username is empty";
  }
}
