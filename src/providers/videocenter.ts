/// <reference path="../d.ts/rmc3.d.ts" />
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Videocenter {
    socketUrl: string = "http://localhost:9001/";
    static socket:any = false;
    static connection;
  constructor() {
    console.log('Hello Videocenter Provider');
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
  getSocket() : void {
        if ( Videocenter.socket === false ) {
            Videocenter.socket = Videocenter.connection.getSocket();
        }
        return Videocenter.socket;
  }
}