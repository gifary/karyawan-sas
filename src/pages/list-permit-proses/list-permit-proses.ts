import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ActionSheetController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * Generated class for the ListPermitProsesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-permit-proses',
  templateUrl: 'list-permit-proses.html',
})
export class ListPermitProsesPage {

  data: Array<any>;
  dataoriginal: Array<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public karyawanProvider: KaryawanProvider,
    public localStorage:LocalStorageService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    let p_karyawan_id = parseInt(this.localStorage.get("p_karyawan_id")+'');
    this.getPermitProses(42);
  }


  private getPermitProses(p_karyawan_id:number){
    this.data = [];
    return this.karyawanProvider.listProsesPermit(p_karyawan_id).subscribe(ResArray=>{
      if(ResArray.code==200){
        this.data = ResArray.data;
        this.dataoriginal = ResArray.data;
      }else{
        console.log("error")
      }

    });
  }

  openMenu(t_form_exit_id) {

    let actionSheet = this.actionsheetCtrl.create({
      title: 'Pilih',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Setujui',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  search(searchEvent?) {
    let term = searchEvent.target.value
    if (term.trim() === '' || term.trim().length < 3) {
      this.data = this.dataoriginal;
    }else{
      this.data = [];
      for(let d of this.dataoriginal){
          let nama = d.karyawan.nama.toLowerCase();
          if(nama.includes(term.toLowerCase())){
            this.data.push(d);
          }
      }
    }
  }
}


