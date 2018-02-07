import { Component,isDevMode } from '@angular/core';
import { NavController, NavParams,ModalController,AlertController,ToastController,LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CalendarModal } from "ion2-calendar";
import { ListKaryawanModalPage } from '../list-karyawan-modal/list-karyawan-modal'
import { ShiftModalPage } from '../shift-modal/shift-modal';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { ListChangeSchedulePage } from '../list-change-schedule/list-change-schedule';
import { LocalStorageService } from 'angular-2-local-storage';
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
  loading;
  p_karyawan_id:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public karyawanProvider: KaryawanProvider,
    public localStorageService: LocalStorageService,
    public modalCtrl: ModalController) {
    this.list_jenis_izin = [
      { id: '0', nama: "Change Off" },
      { id: '1', nama: 'Change Shift' },
      { id: '2', nama: 'Change Public Holiday' }
    ];
    this.p_karyawan_id = parseInt(this.localStorageService.get('p_karyawan_id') + '');
  }

  ionViewDidLoad() {
    this.nama_tukeran ="PILIH";
    this.nama_hod = "PILIH HOD/EAM";
    this.nama_hrd = "PILIH HRD";
    this.nama_shift_awal ="PILIH";
    this.nama_shift_perubahan ="PILIH";
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
    myCalendar.dismiss();

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

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  presentToast(message: string) {
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

  storeReschedule(form: NgForm) {
    
    if (isDevMode()) {
      console.log(form.value);
    }

    if (!form.value.nama_tukeran) {
      this.showAlert("Nama pengganti Required");
      return false;
    }

    if(!form.value.nama_hod) {
      this.showAlert("HOD Required");
      return false;
    }

    if(!form.value.nama_hrd.length) {
      this.showAlert("HOD Required");
      return false;
    }
    
    if (!form.value.tgl_awal) {
      this.showAlert("Tanggal Awal Required");
      return false;
    }

    if(!form.value.tgl_perubahan) {
      this.showAlert("Tanggal Perubahan Required");
      return false;
    }

    if (form.valid) {
      this.presentLoadingDefault();
      return this.karyawanProvider.storeReschedule(form).subscribe(Resobject => {
        if (Resobject.code == 200) {
          this.presentToast("Success save");
          this.navCtrl.setRoot(ListChangeSchedulePage);
          this.loading.dismiss();
        } else {
          this.presentToast(Resobject.message);
          this.loading.dismiss();
        }
      });
    }
  }

}
