import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntrancePage } from '../pages/entrance/entrance';
import { LobbyPage } from '../pages/lobby/lobby';
import { Videocenter } from '../providers/videocenter';

@NgModule({
  declarations: [
    MyApp,
    EntrancePage,
    LobbyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntrancePage,
    LobbyPage
  ],
  providers: [ Videocenter ]
})
export class AppModule {}
