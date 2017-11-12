import { Component, ViewChild } from '@angular/core';

import { MenuController, Nav } from 'ionic-angular';

// pages
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { LogoutPage } from '../logout/logout';
import { ListPermitPage } from '../list-permit/list-permit';
import { LocalStorageService } from 'angular-2-local-storage';
import { config } from '../../config/config';
import { ChatRoomPage } from '../chat-room/chat-room';
/**
 * Generated class for the NavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'navigation.html',
  styleUrls: ['assets/css/style-be.css']
})
export class NavigationPage {

  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  nama: string;
  url_foto:string;

  constructor(
    public menu: MenuController,
    private localStorageService: LocalStorageService
   
  ) {
    //this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Izin/Cuti', component: ListPermitPage },
      { title: 'Chat Room', component: ChatRoomPage },
      { title: 'Logout', component: LogoutPage },
    ];
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
