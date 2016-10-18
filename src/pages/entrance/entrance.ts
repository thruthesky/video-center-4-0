import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';
@Component({
  selector: 'page-entrance',
  templateUrl: 'entrance.html'
})
export class EntrancePage {
  username: string;
  constructor(public navCtrl: NavController) {
    this.username = "";
  }
  signin(username: string) {
    if ( username != ""){
      this.username = '';
      this.navCtrl.push( LobbyPage );
    }
  }
}
