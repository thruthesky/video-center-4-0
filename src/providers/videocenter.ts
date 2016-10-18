/// <reference path="../d.ts/rmc3.d.ts" />
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export const LobbyRoomName: string = 'Lobby';
@Injectable()
export class Videocenter {
    socketUrl: string = "http://localhost:9001/";
    static socket:any = false;
    static connection;
  constructor() {
    console.log('Hello Videocenter Provider');
  }
  get socket() {
    return this.getSocket();
  }
  /**
   * Connects to the server.
   */
  connnect() {
      console.log("Videocenter::connect()");
    Videocenter.connection = new RTCMultiConnection();
    Videocenter.connection.socketURL = this.socketUrl;
  }
  /**
   * Gets the socket.
   */
  getSocket() {
        if ( Videocenter.socket === false ) {
            Videocenter.socket = Videocenter.connection.getSocket();
        }
        return Videocenter.socket;
  }
  
  joinRoom( roomname: string, callback ) {
    this.emit('join-room', roomname, callback);
  }
  /**
   * @edited by JaeHo. Put better signature. 2016-09-02.
   */
  emit( protocol: string, data?: any, callback?: boolean | any ) {
    this.socket.emit( protocol, data, callback );
  }
    

}