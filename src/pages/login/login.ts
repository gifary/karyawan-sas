import { Component } from '@angular/core';
import { NavController, Platform, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Karyawan } from '../../models/Karyawan';
import { Resobject } from '../../models/resobject';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { HomePage } from '../home/home';
import { NavigationPage } from '../navigation/navigation';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    resObject: Resobject;
    karyawan: Karyawan;

    constructor(
      public navCtrl: NavController,
      public karyawanProvider: KaryawanProvider, 
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService,
      private router: Router,
      public platform: Platform,
      public toastCtrl: ToastController) {

  	  console.log("siap show login");
      let p_karyawan_id = this.localStorageService.get("p_karyawan_id");
      if(p_karyawan_id){
        this.navCtrl.push(NavigationPage,{});
      }
      platform.ready().then(() => {
          platform.registerBackButtonAction(()=>{
            let toast = this.toastCtrl.create({
                message:  'Warning, you can\'t go back',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
          });
      });
    }

    loginUser(form: NgForm){
    	return this.karyawanProvider.login(form.value.email,form.value.password).subscribe(resObject => {
  	    this.resObject = resObject;

        if(resObject.code==400){
          this.showAlert(resObject.message);
        }else if(resObject.code==200){ //berhasil login
          this.showAlert(resObject.message);
          this.karyawan = resObject.data;
	        this.localStorageService.set("p_karyawan_id",this.karyawan.p_karyawan_id);
          this.localStorageService.set("user_id",this.karyawan.user_id);
          this.localStorageService.set("email_perusahaan",this.karyawan.email_perusahaan);
          this.localStorageService.set("nik",this.karyawan.nik);
          this.localStorageService.set("nama",this.karyawan.nama);
          this.navCtrl.push(NavigationPage,{});
        }
        
  	  })
    }

    showAlert(message:string) {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

}
