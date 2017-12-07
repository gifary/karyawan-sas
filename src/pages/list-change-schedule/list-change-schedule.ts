import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
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

  private getReschedule(p_karyawan_id:number){
  	this.data_reschedule = [];
    return this.karyawanProvider.listReScheduleShift(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data_reschedule = ResArray.data;
      }else{
        console.log("error")
      }
    });
  }

  private getRescheduleMod(p_karyawan_id:number){
  	this.data_reschedule_mod = [];
    return this.karyawanProvider.listReScheduleMod(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data_reschedule = ResArray.data;
      }else{
        console.log("error")
      }
    });
  }

}
