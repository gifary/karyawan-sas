import { Component, isDevMode } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
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

/**
 * Generated class for the PermitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-permit',
  templateUrl: './permit.html',
  styleUrls: ['assets/css/style-be.css']
})
export class PermitPage  {
  
  tgl_awal: string;
  jenis_izin: number;
  jam_awal: string;
  jam_akhir: string;
  keterangan: string;
  cameraUrl: string;
  resobject: Resobject;
  data: Observable<any>;
  list_izin: Array<{id: string, nama: string}>;
  list_karyawan: Array<{id: string, nama: string}>;
  list_security: Array<{id: string, nama: string}>;
  show_jam :boolean;
  p_karyawan_id: number;
  loading;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
    public karyawanProvider: KaryawanProvider,
    private localStorageService: LocalStorageService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController ) {
   
  }

  onChange($event) {
  }

  ionViewDidLoad() {
    this.tgl_awal="";
    this.show_jam =false;
    this.getLisIzin(0);
    this.getListKaryawan();
    this.getListSecurity();
    this.p_karyawan_id = parseInt(this.localStorageService.get('p_karyawan_id')+'');
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  openCalendar() {
    const options = {
      pickMode: 'multi',
      title: 'Choose Date'
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
        if(isDevMode()){
          console.log(date);  
        }
        if(date!=null){
          this.tgl_awal="";
          let i=1;
          for (let entry of date) {
            if(i==1){
              this.tgl_awal +=entry.string;  
            }else{
              this.tgl_awal +=','+entry.string;  
            }
            i++;
          }  
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

  storePermit(form: NgForm){
    if(isDevMode()){
        console.log(form.value);
    }
    if(!form.value.m_jenis_ijin_id){
      this.showAlert("Jenis Izin Required");
      return false;
    }

    if(form.value.tgl_awal==""){
      this.showAlert("Tanggal Izin Required");
      return false;
    }

    if(!form.value.appr_1){
      this.showAlert("HOD Required");
      return false;
    }

    if(!form.value.appr_2){
      this.showAlert("HRD Required");
      return false;
    }
    if(form.valid){
      this.presentLoadingDefault();
      return this.karyawanProvider.storePermit(form).subscribe(Resobject =>{
        this.resobject = Resobject;
        console.log(Resobject);
        if(Resobject.code==200){
          this.presentToast("Success save");
          this.navCtrl.setRoot(ListPermitPage);
          this.loading.dismiss();
        }else{
          this.presentToast(Resobject.message);
          this.loading.dismiss();
        }
      });  
    }
    
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

  changeJenisizin(event){
    if(event==5){
      this.show_jam =true;
    }else{
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

  private getLisIzin(tipe:number){
      return this.karyawanProvider.jenisIzin(tipe).subscribe(Resobject => {
        this.resobject = Resobject;
        this.list_izin = [];
        if(Resobject.code==400){
          console.log(Resobject.message);
        }else if(Resobject.code==200){ //berhasil login
          let data = Resobject.data
          for(let key in data){
            this.list_izin.push({
              id: key,
              nama: data[key]
            });
          }
        }
        
      })
  }

  private getListKaryawan(){
    let m_lokasi_id = parseInt(this.localStorageService.get('m_lokasi_id')+'');
    return this.karyawanProvider.listKaryawan(m_lokasi_id).subscribe(Resobject => {
        this.resobject = Resobject;
        this.list_karyawan = [];
        if(Resobject.code==400){
          console.log(Resobject.message);
        }else if(Resobject.code==200){ //berhasil login
          let data = Resobject.data
          for(let key in data){
            this.list_karyawan.push({
              id: key,
              nama: data[key]
            });
          }
        }
        
      })
  }

  private getListSecurity(){
    let m_lokasi_id = parseInt(this.localStorageService.get('m_lokasi_id')+'');
    return this.karyawanProvider.listSecurity(m_lokasi_id).subscribe(Resobject => {
        this.resobject = Resobject;
        this.list_security = [];
        if(Resobject.code==400){
          console.log(Resobject.message);
        }else if(Resobject.code==200){ //berhasil login
          let data = Resobject.data
          for(let key in data){
            this.list_security.push({
              id: key,
              nama: data[key]
            });
          }
        }
        
      })
  }

}
