import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PermitPage } from '../permit/permit';
/**
 * Generated class for the ListPermitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-permit',
  templateUrl: 'list-permit.html',
})
export class ListPermitPage {

  permits: Array<{jenis_izin: string, tgl_pengajuan: string, status: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    

    this.permits = [];
    for(let i = 1; i < 11; i++) {
      this.permits.push({
        jenis_izin: "ijin ke-"+i,
        tgl_pengajuan: "Tgl Pengajuan Rabu, 12 Jan 2017"+i,
        status: "Proses"
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPermitPage');
  }

  addPermit(){
  	this.navCtrl.push(PermitPage,{});
  }

}
