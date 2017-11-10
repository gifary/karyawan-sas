import { Component } from '@angular/core';
import { NavController, 
  NavParams,
  Platform,
  ActionSheetController,
  ToastController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ListPermitNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-permit-notif',
  templateUrl: 'list-permit-notif.html',
})
export class ListPermitNotifPage {

  data: Array<any>;
  dataoriginal: Array<any>;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
    public localStorage:LocalStorageService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(()=>{
        this.navCtrl.push(LoginPage,{});
      });
    });
  }

  ionViewDidLoad() {
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getPermitProses(p_karyawan_id);
  }


  private getPermitProses(p_karyawan_id:number){
    this.data = [];
    return this.karyawanProvider.listProsesPermit(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data = ResArray.data;
        this.dataoriginal = ResArray.data;
      }else{
        console.log("error")
      }

    });
  }

  openMenu(permit) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Pilih',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Setujui',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            console.log(permit.t_form_exit_id);
            this.karyawanProvider.updatePermit(1,permit.t_form_exit_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            let index = this.data.indexOf(permit);
            if(index >=0){
              this.data.splice(index, 1);
            }
          }
        },
        {
          text: 'Tolak',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.karyawanProvider.updatePermit(0,permit.t_form_exit_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            let index = this.data.indexOf(permit);
            if(index >=0){
              this.data.splice(index, 1);
            }
          }
        }
      ]
    });
    actionSheet.present();
  }

  search(searchEvent?) {
    let term = searchEvent.target.value
    if (term.trim() === '' || term.trim().length < 3) {
      this.data = this.dataoriginal;
    }else{
      this.data = [];
      for(let d of this.dataoriginal){
          let nama = d.karyawan.nama.toLowerCase();
          if(nama.includes(term.toLowerCase())){
            this.data.push(d);
          }
      }
    }
  }

  onCancel(event){
    this.data = this.dataoriginal;
  }

  presentToast(message:string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  doRefresh(refresher){
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getPermitProses(p_karyawan_id);
    if(refresher != 0) refresher.complete();
  }

  goBack(){
  	this.navCtrl.push(LoginPage,{});
  }
}
