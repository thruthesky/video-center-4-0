import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as x from '../../providers/videocenter';
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {

  constructor(public navCtrl: NavController, private vc: x.Videocenter ) {
    vc.joinRoom( x.LobbyRoomName, re => { 
      console.log('LobbyPage::constructor() joinRoom callback:', re);
     } );
  }

}
