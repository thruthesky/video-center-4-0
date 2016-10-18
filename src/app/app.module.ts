import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntrancePage } from '../pages/entrance/entrance';
import { LobbyPage } from '../pages/lobby/lobby';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Videocenter } from '../providers/videocenter';

@NgModule({
  declarations: [
    MyApp,
    EntrancePage,
    LobbyPage,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntrancePage,
    LobbyPage,
    Page1,
    Page2
  ],
  providers: [ Videocenter ]
})
export class AppModule {}
