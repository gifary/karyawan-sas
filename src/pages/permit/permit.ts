import { Component, isDevMode } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CalendarModal } from "ion2-calendar";
import { NgForm } from '@angular/forms';
import { Camera } from 'ionic-native';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/resobject';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ListPermitPage } from '../list-permit/list-permit';
import { LoadingController } from 'ionic-angular';
import { ListKaryawanModalPage } from '../list-karyawan-modal/list-karyawan-modal'
/**
 * Generated class for the PermitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-permit',
  templateUrl: './permit.html'
})
export class PermitPage {
  appr_1:number;
  appr_2:number;
  appr_3:number;
  tgl_awal: string;
  nama_hod: string;
  nama_hrd: string;
  nama_security: string;
  jenis_izin: number;
  jam_awal: string;
  jam_akhir: string;
  keterangan: string;
  cameraUrl: string;
  resobject: Resobject;
  data: Observable<any>;
  list_izin: Array<{ id: string, nama: string }>;
  show_jam: boolean;
  p_karyawan_id: number;
  loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public karyawanProvider: KaryawanProvider,
    private localStorageService: LocalStorageService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

  }

  openModal(type_karyawan) {
    let obj = { id: type_karyawan };
    var myModal = this.modalCtrl.create(ListKaryawanModalPage, obj);
    myModal.present();
    myModal.onDidDismiss(karyawan => {
       if(karyawan!=null){
         if(type_karyawan==1){
           this.nama_hod = karyawan.nama;
           this.appr_1=karyawan.id
         }else if(type_karyawan==2){
           this.nama_hrd = karyawan.nama;
           this.appr_2=karyawan.id
         }else{
           this.nama_security = karyawan.nama;
           this.appr_3=karyawan.id
         }
       }
    })
  }

  onChange($event) {
  }

  ionViewDidLoad() {
    this.tgl_awal = "";
    this.nama_hod = "";
    this.appr_1=0;
    this.appr_2=0;
    this.appr_3=0;
    // this.nama_hrd = "";
    // this.nama_security = "";
    this.show_jam = false;
    this.getLisIzin(0);
    // this.getListKaryawan();
    // this.getListSecurity();
    this.p_karyawan_id = parseInt(this.localStorageService.get('p_karyawan_id') + '');
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  openCalendar() {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    const options = {
      pickMode: 'multi',
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
        this.tgl_awal = "";
        let i = 1;
        for (let entry of date) {
          if (i == 1) {
            this.tgl_awal += entry.string;
          } else {
            this.tgl_awal += ',' + entry.string;
          }
          i++;
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

  storePermit(form: NgForm) {
    if (isDevMode()) {
      console.log(form.value);
    }
    if (!form.value.m_jenis_ijin_id) {
      this.showAlert("Jenis Izin Required");
      return false;
    }

    if (form.value.tgl_awal == "") {
      this.showAlert("Tanggal Izin Required");
      return false;
    }

    if (form.value.appr_1==0) {
      this.showAlert("HOD Required");
      return false;
    }

    if (form.value.appr_2==0) {
      this.showAlert("HRD Required");
      return false;
    }
    if (form.valid) {
      this.presentLoadingDefault();
      return this.karyawanProvider.storePermit(form).subscribe(Resobject => {
        this.resobject = Resobject;
        console.log(Resobject);
        if (Resobject.code == 200) {
          this.presentToast("Success save");
          this.navCtrl.setRoot(ListPermitPage);
          this.loading.dismiss();
        } else {
          this.presentToast(Resobject.message);
          this.loading.dismiss();
        }
      });
    }
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

  changeJenisizin(event) {
    if (event == 5) {
      this.show_jam = true;
    } else {
      this.show_jam = false;
    }
  }

  selectFromGallery() {
    var options = {
      quality: 50,
      allowEdit: true,
      targetWidth: 800,
      targetHeight: 800,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraUrl = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openCamera() {
    var options = {
      quality: 50,
      allowEdit: true,
      targetWidth: 800,
      targetHeight: 800,
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraUrl = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  private getLisIzin(tipe: number) {
    return this.karyawanProvider.jenisIzin(tipe).subscribe(Resobject => {
      this.resobject = Resobject;
      this.list_izin = [];
      if (Resobject.code == 400) {
      } else if (Resobject.code == 200) { //berhasil login
        let data = Resobject.data
        for (let key in data) {
          this.list_izin.push({
            id: key,
            nama: data[key]
          });
        }
      }

    })
  }
}
