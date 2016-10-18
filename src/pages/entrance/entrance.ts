import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';
@Component({
  selector: 'page-entrance',
  templateUrl: 'entrance.html'
})
export class EntrancePage {
  username: string;
  error: string;
  constructor(public navCtrl: NavController) {
  }
  onClickSignin() {
    if ( this.username ) {
      this.navCtrl.push( LobbyPage );
    }
    else {
      this.showErrorInputUsername();
    }
  }
  showErrorInputUsername() {
    this.error = "Why don't you input yourname? right?";
  }
}
