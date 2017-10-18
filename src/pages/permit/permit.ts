import { Component, isDevMode } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { CalendarModal } from "ion2-calendar";
import { NgForm } from '@angular/forms';

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
export class PermitPage {
  
  tgl_pilih: string;
  jenis_izin: number;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public modalCtrl: ModalController) {
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

}
