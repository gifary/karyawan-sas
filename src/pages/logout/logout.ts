import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LocalStorageService } from 'angular-2-local-storage';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private localStorageService: LocalStorageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.localStorageService.clearAll();
    this.navCtrl.push(LoginPage,{});
  }

}
