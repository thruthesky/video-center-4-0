import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as x from '../../providers/videocenter';
import { RoomPage } from '../room/room';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {

  constructor(public navCtrl: NavController, private vc: x.Videocenter, public alertCtrl: AlertController ) {
    vc.joinRoom( x.LobbyRoomName, re => { 
      console.log('LobbyPage::constructor() joinRoom callback:', re);
     } );
  }
  onClickUpdateUsername() {
    
    let prompt = this.alertCtrl.create({
      title: 'Update Username',
      message: "Enter a username to update your username",
      inputs: [
        {
          name: 'username',
          placeholder: 'Update Username'
        },
      ],
      buttons: [
        {
          text: 'Update',
          handler: data => {
            console.log('Update Username clicked');
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }        
      ]
    });
    prompt.present();
  }
  onClickCreateRoom() {
    let prompt = this.alertCtrl.create({
      title: 'Create Room',
      message: "Enter a roomname to create a new room",
      inputs: [
        {
          name: 'roomname',
          placeholder: 'Create Room'
        },
      ],
      buttons: [
        {
          text: 'Create',
          handler: data => {
            console.log('Create Room clicked');
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }        
      ]
    });
    prompt.present();
  }
  onClickJoinRoom() {
      this.navCtrl.push( RoomPage );   
  }

}
