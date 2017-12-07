import { Component, ViewChild,isDevMode } from '@angular/core';

import { MenuController, Nav, NavParams } from 'ionic-angular';

// pages
import { HomePage } from '../home/home';
import { LogoutPage } from '../logout/logout';
import { ListPermitPage } from '../list-permit/list-permit';
import { LocalStorageService } from 'angular-2-local-storage';
import { config } from '../../config/config';
import { ChatRoomPage } from '../chat-room/chat-room';
import { QrcodePage } from '../qrcode/qrcode';
import { ListPermitProsesPage } from '../list-permit-proses/list-permit-proses';
import { ListSessionPage } from '../list-session/list-session';
import { ListChangeSchedulePage } from '../list-change-schedule/list-change-schedule';
/**
 * Generated class for the NavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'navigation.html'
})
export class NavigationPage {

  @ViewChild("content") nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  nama: string;
  url_foto:string;

  constructor(
    public menu: MenuController,
    private localStorageService: LocalStorageService,
    public navParams: NavParams
  ) {
    //this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Permit/Leave', component: ListPermitPage },
      { title: 'Reschedule', component: ListChangeSchedulePage },
      { title: 'Approval', component: ListPermitProsesPage },
      { title: 'Training', component: ListSessionPage },
      { title: 'Qr Code', component: QrcodePage },
      { title: 'Logout', component: LogoutPage },
    ];
    if(isDevMode()){
       console.log("status notif"+this.navParams.get('status_notif'))
    }
    if(this.navParams.get('status_notif')==true||this.navParams.get('status_notif')=='true'){
        this.nav.setRoot(ListPermitProsesPage);
    }
    this.nama = this.localStorageService.get('nama')+'';
    this.url_foto = config.path_file+this.localStorageService.get('foto')+'';
    
  }

  ionViewDidLoad() {
    this.nama = this.localStorageService.get('nama')+'';
    this.url_foto = config.path_file+this.localStorageService.get('foto')+'';
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
