import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  	nik: string;
    nama: string;
    email: string;
    p_karyawan_id: number;
    user_id: number;
    qr_code: string;
    lokasi;departement;jabatan:string;
    absen: Array<any>;

    constructor(
      public navCtrl: NavController,
      private localStorageService: LocalStorageService
    ) {

      this.nik = this.localStorageService.get('nik')+'';
      this.nama = this.localStorageService.get('nama')+'';
      this.email = this.localStorageService.get("email_perusahaan")+'';
      this.lokasi = this.localStorageService.get("lokasi")+'';
      this.departement = this.localStorageService.get("departement")+'';
      this.jabatan = this.localStorageService.get("jabatan")+'';
      this.p_karyawan_id = parseInt(this.localStorageService.get('p_karyawan_id')+'');
      this.user_id = parseInt(this.localStorageService.get('user_id')+'');
      this.qr_code = this.nik+'-'+this.p_karyawan_id+'-'+this.user_id+'-'+this.nama;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

}
