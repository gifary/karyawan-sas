import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,Platform,ToastController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';
import { ChangeSchedulePage } from '../change-schedule/change-schedule';

/**
 * Generated class for the ListChangeSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-change-schedule',
  templateUrl: 'list-change-schedule.html',
})
export class ListChangeSchedulePage {

  data_reschedule: Array<any>;
  data_reschedule_mod: Array<any>;
  schedule: string = "shift";

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public localStorage:LocalStorageService) {
  }


  ionViewDidLoad() {
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getReschedule(p_karyawan_id);
    this.getRescheduleMod(p_karyawan_id);
  }

  addReschedule(status_mod){
  	this.navCtrl.push(ChangeSchedulePage,{status_mod:status_mod});
  }

  openMenu(reschedule,status_mod) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Pilih',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Setujui',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.karyawanProvider.updateReschedule(1,reschedule.t_reschedule_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            if(status_mod==1){
              let index = this.data_reschedule_mod.indexOf(reschedule);
              if(index >=0){
                this.data_reschedule_mod.splice(index, 1);
              }  
            }else{
              let index = this.data_reschedule.indexOf(reschedule);
              if(index >=0){
                this.data_reschedule.splice(index, 1);
              }
            }
            
          }
        },
        {
          text: 'Tolak',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.karyawanProvider.updateReschedule(0,reschedule.t_reschedule_id).subscribe(resObject=>{
              this.presentToast(resObject.message);
            });
            if(status_mod==1){
              let index = this.data_reschedule_mod.indexOf(reschedule);
              if(index >=0){
                this.data_reschedule_mod.splice(index, 1);
              }  
            }else{
              let index = this.data_reschedule.indexOf(reschedule);
              if(index >=0){
                this.data_reschedule.splice(index, 1);
              }
            }
          }
        }
      ]
    });
    actionSheet.present();
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

  private getReschedule(p_karyawan_id:number){
  	this.data_reschedule = [];
    this.karyawanProvider.listReSchedule(p_karyawan_id,0).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data_reschedule = ResArray.data;
      }else{
        console.log("error")
      }
    });
  }

  private getRescheduleMod(p_karyawan_id:number){
  	this.data_reschedule_mod = [];
    this.karyawanProvider.listReSchedule(p_karyawan_id,1).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data_reschedule = ResArray.data;
      }else{
        console.log("error")
      }
    });
  }

}
