import { Component } from '@angular/core';
import { NavController, 
  NavParams,
  Platform,
  ActionSheetController,
  ToastController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';


/**
 * Generated class for the ListPermitProsesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-permit-proses',
  templateUrl: 'list-permit-proses.html',
})
export class ListPermitProsesPage {

  data: Array<any>;
  data_res: Array<any>;
  dataoriginal: Array<any>;
  dataoriginalRes: Array<any>;
  schedule = "permit";
  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
    public localStorage:LocalStorageService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getPermitProses(p_karyawan_id);
    this.getRescheduleProses(p_karyawan_id);
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

  private getRescheduleProses(p_karyawan_id:number){
    this.data_res = [];
    return this.karyawanProvider.listProsesReschedule(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data_res = ResArray.data;
        this.dataoriginalRes = ResArray.data;
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

  openMenuRes(res) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Pilih',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Setujui',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.karyawanProvider.updateReschedule(1,res.t_reschedule_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            let index = this.data_res.indexOf(res);
            if(index >=0){
              this.data_res.splice(index, 1);
            }
          }
        },
        {
          text: 'Tolak',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.karyawanProvider.updateReschedule(0,res.t_reschedule_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            let index = this.data_res.indexOf(res);
            if(index >=0){
              this.data_res.splice(index, 1);
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

  searchRes(searchEvent?) {
    let term = searchEvent.target.value
    if (term.trim() === '' || term.trim().length < 3) {
      this.data_res = this.dataoriginalRes;
    }else{
      this.data_res = [];
      for(let d of this.dataoriginalRes){
          let nama = d.karyawan.nama.toLowerCase();
          if(nama.includes(term.toLowerCase())){
            this.data_res.push(d);
          }
      }
    }
  }

  onCancel(event){
    this.data = this.dataoriginal;
  }

  onCancelRes(event){
    this.data_res = this.dataoriginalRes;
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
  };
}


