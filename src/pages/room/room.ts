import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import * as x from '../../providers/videocenter';
import { LobbyPage } from '../lobby/lobby';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
export interface MESSAGELIST {
    messages: Array< x.MESSAGE >
}
@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  title: string;
  inputMessage: string;
  listMessage: MESSAGELIST = <MESSAGELIST> {};
  //  Draw
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300,

  };
  constructor(
    public navCtrl: NavController, 
    private vc: x.Videocenter,
    private events: Events ) {
      this.inputMessage = '';
      if ( this.listMessage[0] === void 0 ) {
        this.listMessage[0] = { messages: [] };
      }
      vc.getRoomname().then( roomname => this.title = roomname );
      this.listenEvents();
  }
  onClickLobby() {
    this.vc.leaveRoom(()=> {
      this.navCtrl.setRoot( LobbyPage );
    });    
  }
  onSendMessage(message: string) {
    if(message != ""){
      this.vc.sendMessage(message, ()=> {
        this.inputMessage = '';             
      });
         
    }
  }
  listenEvents() {
    this.events.subscribe( 'join-room', re => {
      console.log("RoomPage::listenEvents() => someone joins the room: ", re );          
      let message = { name: re[0].name, message: ' joins into ' + re[0].room };//Set Message
      this.addMessage( message );    
    });    
    this.events.subscribe( 'chatMessage', re => {
      console.log("RoomPage::listenEvents() => One user receive message: ", re ); 
      let message = re[0];
      this.addMessage( message );         
    });
    
  }
  addMessage( message ) {     
    this.listMessage[0].messages.push( message ); 
  }
  // Draw
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }
  onClickClearCanvas() {
    this.signaturePad.clear(); 
  }
  onClickBlackColor() {
    this.signaturePad.set('penColor','black');    
  }
  onClickDraw() {
    this.signaturePad.draw();
  }
  onClickErase() {
    this.signaturePad.erase();
  }
  onClickRedColor() {
    this.signaturePad.set('penColor','red');
  }
  onClickGreenColor() {
    this.signaturePad.set('penColor','green');
  }
  onClickBlueColor() {
    this.signaturePad.set('penColor','blue');
  }
  onClickSmall() {
    this.signaturePad.set('minWidth', 2);
  }
  onClickMedium() {
    this.signaturePad.set('minWidth', 5);
  }
  onClickLarge() {
    this.signaturePad.set('minWidth', 10);
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}
