import { Component, ViewChild } from '@angular/core';

import { MenuController, Nav } from 'ionic-angular';

// pages
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { LogoutPage } from '../logout/logout';
import { PermitPage } from '../permit/permit';
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

  constructor(
    public menu: MenuController,
   
  ) {
    //this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Permit', component: PermitPage },
      { title: 'About', component: AboutPage },
      { title: 'Logout', component: LogoutPage },
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
