import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntrancePage } from '../pages/entrance/entrance';
import { Videocenter } from '../providers/videocenter';

@NgModule({
  declarations: [
    MyApp,
    EntrancePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntrancePage
  ],
  providers: [ Videocenter ]
})
export class AppModule {}
