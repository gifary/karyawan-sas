import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";

/**
 * Generated class for the PermitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-permit',
  templateUrl: 'permit.html',
})
export class PermitPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermitPage');
  }

  openCalendar() {
    const options = {
      pickMode: 'multi',
      title: 'MULTI'
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      console.log(date);
    })
  }

}
