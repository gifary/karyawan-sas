import { Component, isDevMode } from '@angular/core';
import { IonicPage,NavController,Platform,ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/Resobject';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { NavigationPage } from '../navigation/navigation';
import { LoadingController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    resObject: Resobject;
    data: any;
    loading;
    constructor(
      public toastCtrl: ToastController,
      public platform: Platform,
      public navCtrl: NavController,
      public karyawanProvider: KaryawanProvider, 
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService,
      public loadingCtrl: LoadingController,
      public menu: MenuController,
      public fcm:FCM) {

      // this.menu.get().enable(false);
      this.menu.enable(false, 'NavMenu');

      let p_karyawan_id = this.localStorageService.get("p_karyawan_id");
      if(p_karyawan_id){
        if(this.localStorageService.get('status_notif')==true){
          this.navCtrl.push(NavigationPage,{status_notif:true});
        }else{
          this.navCtrl.push(NavigationPage,{});
        }
        
      }
      // platform.ready().then(() => {
      //     platform.registerBackButtonAction(()=>{
      //       let toast = this.toastCtrl.create({
      //           message:  'Warning, you can\'t go back',
      //           duration: 3000,
      //           position: 'bottom'
      //       });
      //       toast.present();
      //     });
      // });
    }

    ionViewWillUnload(){
       this.menu.enable(false, 'NavMenu');
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
          this.localStorageService.set("api_token",this.data.token);
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
          
          this.initFCM();

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

    initFCM(){
      this.fcm.subscribeToTopic('perijinan');

      this.fcm.getToken().then(token=>{
        if(isDevMode()){
            console.log(token);
            console.log(this.data.id);
        }
        this.localStorageService.set("token",token);
        this.karyawanProvider.savetoken(this.data.id,token).subscribe(resobject=>{
        });
      })

      this.fcm.onTokenRefresh().subscribe(token=>{
        if(this.data.id!=null && this.data.id!=''){
          let old_token = this.localStorageService.get('token').toString();
          this.karyawanProvider.updatetoken(this.data.id,old_token,token);
        }
      })

      this.fcm.unsubscribeFromTopic('perijinan');
    }

}
