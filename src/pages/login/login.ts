import { Component } from '@angular/core';
import { NavController, Platform, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/resobject';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
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
  styleUrls: ['assets/css/style-be.css']
})
export class LoginPage {

    resObject: Resobject;
    data: any;

    constructor(
      public navCtrl: NavController,
      public karyawanProvider: KaryawanProvider, 
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService,
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
          this.localStorageService.set("foto",this.data.karyawan.recruitment.foto);
          this.localStorageService.set("lokasi",this.data.karyawan.karyawan_pekerjaan.lokasi.nama);
          this.localStorageService.set("departement",this.data.karyawan.karyawan_pekerjaan.departement.nama);
          this.localStorageService.set("jabatan",this.data.karyawan.karyawan_pekerjaan.jabatan.nama);
          if(this.data.karyawan.absen!=null){
            this.localStorageService.set("no_absen",this.data.karyawan.absen.no_absen);
          }else{
            this.localStorageService.set("no_absen",0);
          }
          
          
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
