import { Component, isDevMode } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { CalendarModal } from "ion2-calendar";
import { NgForm } from '@angular/forms';
import { Camera } from 'ionic-native';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/resobject';
import { Observable } from 'rxjs/Rx';

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
  
  tgl_pilih: string;
  jenis_izin: number;
  jam_awal: string;
  jam_akhir: string;
  keterangan: string;
  cameraUrl: string;
  resobject: Resobject;
  data: Observable<any>;
  list_izin: Array<{id: string, nama: string}>;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
    public karyawanProvider: KaryawanProvider ) {
    this.getLisIzin(0);
  }

  onChange($event) {
    console.log($event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermitPage');
    this.tgl_pilih="";

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
          this.tgl_pilih="";
          for (let entry of date) {
              this.tgl_pilih +=entry.string+",";
          }  
        }
    })
  }

  storePermit(form: NgForm){
    if(isDevMode()){
        console.log(form.value);
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

}
