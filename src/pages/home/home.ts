import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';

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
    lokasi;departement;jabatan:string;
    absen: Array<any>;

    constructor(
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      private localStorageService: LocalStorageService,
      public karyawanProvider: KaryawanProvider) {

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
      this.getAbsen();
    }

    private getAbsen(){
      this.absen = [];
      let no_absen = parseInt(this.localStorageService.get("no_absen")+'');
      return this.karyawanProvider.listAbsen(no_absen).subscribe(ResArray=>{
        if(ResArray.code==200){
          this.absen = ResArray.data;
        }else{
          console.log("error")
        }

      });
    }
}
