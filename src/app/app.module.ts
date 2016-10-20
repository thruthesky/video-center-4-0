import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntrancePage } from '../pages/entrance/entrance';
import { LobbyPage } from '../pages/lobby/lobby';
import { RoomPage } from '../pages/room/room';
import { Videocenter } from '../providers/videocenter';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    EntrancePage,
    LobbyPage,
    RoomPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntrancePage,
    LobbyPage,
    RoomPage
  ],
  providers: [ Videocenter, Storage ]
})
export class AppModule {}
