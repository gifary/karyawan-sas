import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['assets/css/style-be.css']
})
export class HomePage {
  
    nik: string;
    nama: string;
    email: string;
    p_karyawan_id: number;
    user_id: number;
    qr_code: string;
    constructor(
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService) {
      console.log(this.localStorageService.get('nik'));

      this.nik = this.localStorageService.get('nik')+'';
      this.nama = this.localStorageService.get('nama')+'';
      this.email = this.localStorageService.get("email_perusahaan")+'';
      this.p_karyawan_id = parseInt(this.localStorageService.get('p_karyawan_id')+'');
      this.user_id = parseInt(this.localStorageService.get('user_id')+'');
      this.qr_code = this.nik+'-'+this.p_karyawan_id+'-'+this.user_id+'-'+this.nama;
    }
}
