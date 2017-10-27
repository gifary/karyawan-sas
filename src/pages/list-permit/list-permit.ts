import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PermitPage } from '../permit/permit';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';

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

  data: Array<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
    public localStorage:LocalStorageService) {
  }

  ionViewDidLoad() {
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getPermit(p_karyawan_id);
    status="";
  }

  addPermit(){
  	this.navCtrl.push(PermitPage,{});
  }

  private getPermit(p_karyawan_id:number){
    this.data = [];
    return this.karyawanProvider.listPermit(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        console.log(ResArray.data);
        this.data = ResArray.data;
      }else{
        console.log("error")
      }

    });
  }
}
