import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * Generated class for the ListSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-session',
  templateUrl: 'list-session.html',
})
export class ListSessionPage {

  data: Array<any>;
  dataoriginal: Array<any>;
  status: Array<string>;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public karyawanProvider: KaryawanProvider,
  	public localStorage: LocalStorageService
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListSessionPage');
    let p_karyawan_id = this.localStorage.get('p_karyawan_id')+'';
    this.getSession(parseInt(p_karyawan_id));
    this.status = ['','Pending','Scheduled','Completed','Canceled'];
  }

  private getSession(p_karyawan_id:number){
    this.data = [];
    return this.karyawanProvider.listSession(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data = ResArray.data;
        this.dataoriginal = ResArray.data;
      }else{
        console.log("error")
      }

    });
  }

}
