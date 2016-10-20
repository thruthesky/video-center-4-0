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
export interface MESSAGE {
    message: string;
    name: string;
    room: string;
}
export interface MESSAGELIST {
    messages: Array< MESSAGE >
}

@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {
//    rooms: Array<{ room_id: string; users: x.USER}>;
  rooms: ROOMS = <ROOMS> {};
  username: string;
  inputMessage: string;
  listMessage: MESSAGELIST = <MESSAGELIST> {}; 
  constructor(
    public navCtrl: NavController,
    private vc: x.Videocenter,
    public alertCtrl: AlertController,
    private events: Events ) {
    this.inputMessage = '';
    if ( this.listMessage[0] === void 0 ) {
      this.listMessage[0] = { messages: [] };
    }
    vc.joinRoom( x.LobbyRoomName, re => { 
      vc.username.then( x => this.username = x );
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
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            console.log('Update Username clicked');
            this.onUpdateUsername( data.username );
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
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Create Room clicked');
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
    console.log(username);
    if ( username ) {
      this.vc.updateUsername( username, re => {
        this.username = re.name;
      } );
    }
    else {     
      let alert = this.alertCtrl.create({
      title: 'Form Error!',
        subTitle: 'Your username input is empty!',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  onSendMessage(message: string) {
    if(message != ""){
      this.vc.sendMessage(message, ()=> {
        this.inputMessage = '';             
      });
         
    }
  }
  
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
    
  listenEvents() {
    this.events.subscribe( 'update-username', re => {
      console.log("LobbyPage::listenEvents() => One user updated his name: ", re );   
      for( let socket_id in re ) {
        let user: x.USER = re[socket_id];
        let room_id = <string> this.vc.md5( user.room );   
        if ( this.rooms[ room_id ] === void 0 ) this.rooms[ room_id ] = { name: user.room, users: [] };   
        let users = this.rooms[ room_id ].users;        
        for(let i in users) { 
          if( users[i].socket === user.socket) {
            this.rooms[ room_id ].users[i] = user;
            break;
          }          
        }       
      }
    });
    this.events.subscribe( 'chatMessage', re => {
      console.log("LobbyPage::listenEvents() => One user receive message: ", re );   
      for(let i in re) {
        let message = re[i];
        console.log( message );        
        this.listMessage[0].messages.push( message );   
        
      }
      console.log(this.listMessage[0].messages);
      for(let i of this.listMessage[0].messages){
        console.log(i.message)
      }
    });

  }
}
