import { Component } from '@angular/core';
import { NavController, Platform, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/resobject';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { NavigationPage } from '../navigation/navigation';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['assets/css/style-be.css']
})
export class LoginPage {

    resObject: Resobject;
    data: any;
    loading;
    constructor(
      public navCtrl: NavController,
      public karyawanProvider: KaryawanProvider, 
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService,
      public platform: Platform,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController) {

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

    presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.loading.present();
    }

    loginUser(form: NgForm){
      this.presentLoadingDefault();

    	return this.karyawanProvider.login(form.value.email,form.value.password).subscribe(resObject => {
        this.loading.dismiss();
        if(resObject.code==400){
          this.showAlert(resObject.message);
        }else if(resObject.code==200){ //berhasil login
          //this.showAlert(resObject.message);
          this.data = resObject.data;
	        this.localStorageService.set("p_karyawan_id",this.data.karyawan.p_karyawan_id);
          this.localStorageService.set("user_id",this.data.id);
          this.localStorageService.set("email_perusahaan",this.data.karyawan.email_perusahaan);
          this.localStorageService.set("nik",this.data.karyawan.nik);
          this.localStorageService.set("nama",this.data.karyawan.nama);
          this.localStorageService.set("m_lokasi_id",this.data.karyawan.karyawan_pekerjaan.m_lokasi_id);
          this.localStorageService.set("m_departemen_id",this.data.karyawan.karyawan_pekerjaan.m_departemen_id);
          this.localStorageService.set("m_jabatan_id",this.data.karyawan.karyawan_pekerjaan.m_jabatan_id);
          
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
