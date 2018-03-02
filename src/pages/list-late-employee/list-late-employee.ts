import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';
/**
 * Generated class for the ListLateEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-late-employee',
  templateUrl: 'list-late-employee.html',
})
export class ListLateEmployeePage {
	data: Array<any>;
	loading: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public karyawanProvider: KaryawanProvider,
    public localStorage:LocalStorageService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  	this.presentLoadingDefault();
    let m_lokasi_id = parseInt(this.localStorage.get("m_lokasi_id")+'');
    this.getTerlambat(m_lokasi_id);
  }

  private getTerlambat(m_lokasi_id:number){
    this.data = [];
    return this.karyawanProvider.listTerlambat(m_lokasi_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data = ResArray.data;
        this.loading.dismiss();
      }else{
        console.log("error")
      }

    });
  }

  doRefresh(refresher){
    let m_lokasi_id = parseInt(this.localStorage.get("m_lokasi_id")+'');
    this.getTerlambat(m_lokasi_id);
    if(refresher != 0) refresher.complete();
  };

  presentLoadingDefault() {
	  this.loading = this.loadingCtrl.create({
	    content: 'Please wait...'
	  });

	  this.loading.present();
  }

}
