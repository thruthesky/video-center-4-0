import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as x from '../../providers/videocenter';
import { LobbyPage } from '../lobby/lobby';
@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  title: string;
  constructor(public navCtrl: NavController, private vc: x.Videocenter) {
    vc.getRoomname().then( roomname => this.title = roomname );
  }
  onClickLobby() {
    this.vc.leaveRoom(()=> {
      this.navCtrl.setRoot( LobbyPage );
    });    
  }
}
