import { Component,isDevMode } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CalendarModal } from "ion2-calendar";
import { AlertController } from 'ionic-angular';
import { ListKaryawanModalPage } from '../list-karyawan-modal/list-karyawan-modal'
import { ShiftModalPage } from '../shift-modal/shift-modal';

/**
 * Generated class for the ChangeSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-schedule',
  templateUrl: 'change-schedule.html',
})
export class ChangeSchedulePage {
  status_mod = this.navParams.get("status_mod");
  list_jenis_izin: any[];
  nama_tukeran:string;
  nama_hod:string;
  nama_hrd:string;
  p_karyawan_id_perubahan:number;
  appr_1:number;appr_2:number;appr_3:number;
  tgl_awal:string;
  tgl_perubahan:string;
  nama_shift_awal:string;
  nama_shift_perubahan:string;
  shift_awal:number;
  shift_perubahan:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.list_jenis_izin = [
      { id: '0', nama: "Change Off" },
      { id: '1', nama: 'Change Shift' },
      { id: '2', nama: 'Change Public Holiday' }
    ];
  }

  ionViewDidLoad() {
  }
  openModalShift(type){
    var modalShift = this.modalCtrl.create(ShiftModalPage);
    modalShift.present();
    modalShift.onDidDismiss(shift=>{
      if(shift!=null){
        if(type==1){
          this.nama_shift_awal = shift.nama;
          this.shift_awal = shift.id;
        }else{
          this.nama_shift_perubahan = shift.nama;
          this.shift_perubahan = shift.id;
        }  
      }
    })
  }

  openModalKaryawan(type_karyawan) {
    let obj = { id: type_karyawan };
    var myModal = this.modalCtrl.create(ListKaryawanModalPage, obj);
    myModal.present();
    myModal.onDidDismiss(karyawan => {
       if(karyawan!=null){
         if(type_karyawan==1){
           this.nama_tukeran = karyawan.nama;
           this.appr_1=karyawan.id
           this.p_karyawan_id_perubahan = karyawan.id;
         }else if(type_karyawan==2){
           this.nama_hod = karyawan.nama;
           this.appr_2=karyawan.id
         }else{
           this.nama_hrd = karyawan.nama;
           this.appr_3=karyawan.id
         }
       }
    })
  }

  openCalendar(type) {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    const options = {
      pickMode: 'single',
      title: 'Choose Date',
      from: d
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if (isDevMode()) {
        console.log(date);
      }
      if (date != null) {
        if(type==1){
          this.tgl_awal = date.string;
        }else{
           this.tgl_perubahan = date.string;
        }
      }
    })
  }

  storeReschedule(form: NgForm) {
    if (isDevMode()) {
      console.log(form.value);
    }
  }

}
