import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { Page1 } from '../../pages/page1/page1';
import { Page2 } from '../../pages/page2/page2';
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html'
})
export class LobbyPage {
 @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, platform: Platform ) {
     this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
