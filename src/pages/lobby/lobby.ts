import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import * as x from '../../providers/videocenter';
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {

  constructor(public navCtrl: NavController, platform: Platform, private vc: x.Videocenter ) {
    vc.joinRoom( x.LobbyRoomName, re => { 
      console.log('LobbyPage::constructor() joinRoom callback:', re);
     } );
  }

}
