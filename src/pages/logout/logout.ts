import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LocalStorageService } from 'angular-2-local-storage';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public karyawanProvider: KaryawanProvider,
    public navCtrl: NavController, 
  	public navParams: NavParams,
    public menu: MenuController,
  	private localStorageService: LocalStorageService) {
  }

  ionViewDidLoad() {
    let token = this.localStorageService.get('token')+'';
    let user_id = parseInt(this.localStorageService.get('user_id')+'');
    this.karyawanProvider.removeToken(user_id,token).subscribe(resObject=>{

    });

    this.localStorageService.clearAll();
    this.navCtrl.setRoot(LoginPage,{animate:true,animation:"md-transition",direction:"back",duration:1000});
  }

  ionViewWillUnload(){
       this.menu.enable(false, 'NavMenu');
  }
}
