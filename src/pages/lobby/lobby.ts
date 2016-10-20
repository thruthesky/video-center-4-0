import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import * as x from '../../providers/videocenter';
import { RoomPage } from '../room/room';
import { AlertController } from 'ionic-angular';
import { EntrancePage } from '../entrance/entrance';

export interface ROOMS {
  ( room_id: string ) : {
    name: string;
    users: Array< x.USER >;
  }
}
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {
//    rooms: Array<{ room_id: string; users: x.USER}>;
  rooms: ROOMS = <ROOMS> {};
  username: string;
  constructor(
    public navCtrl: NavController,
    private vc: x.Videocenter,
    public alertCtrl: AlertController,
    private events: Events ) {
    vc.username.then( x => this.username = x );
    vc.joinRoom( x.LobbyRoomName, re => { 
      console.log('LobbyPage::constructor() joinRoom callback:', re);
      vc.userList( '', re => {
        console.log('LobbyPage::constructor() vc.userList callback(): ', re);
        this.showRoomList( re );
      })
    });
    
    this.listenEvents();
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
            this.onUpdateUsername( data );
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

  onClickLogout() {
    this.vc.setConfig('username', '');
    this.navCtrl.setRoot( EntrancePage );
  }
  onUpdateUsername( username: string ) {

  }
  /**
   * 
   */
  showRoomList( users: { (key: string) : Array<x.USER> } ) {
    console.log( 'LobbyPage::showRoomList() users: ', users );
    for ( let socket_id in users ) {
      let user: x.USER = users[socket_id];
      console.log(' room.name: ' + user.room );
      let room_id = <string> this.vc.md5( user.room );
      console.log( ' room_id : ' + room_id );
      if ( this.rooms[ room_id ] === void 0 ) {
        this.rooms[ room_id ] = { name: user.room, users: [] };
      }
      this.rooms[ room_id ].users.push( user );     
    }
    console.log( 'LobbyPage::showRoomList()', this.rooms );
  }
  get roomIds () {
    return Object.keys( this.rooms );
  }
  /*
      static show_room_list( users: Array<de.User> ) :void {
        for( let i in users ) {
            if ( ! users.hasOwnProperty(i) ) continue;
            let user: de.User = users[i];   
            if(user.type != de.admin_type){      
                let room_id = MD5(user.room);
                let $room = e.lobby_room_list.find('[id="'+room_id+'"]');
                if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
                Lobby.add_user(user);
            }  
        }         
    }
    */
    
    
  listenEvents() {
    this.events.subscribe( 'update-username', re => {
      console.log("LobbyPage::listenEvents() => One user updated his name: ", re );
    });
  }
}
