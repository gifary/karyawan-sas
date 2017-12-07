import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { Resobject } from '../../models/resobject';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * Generated class for the ShiftModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shift-modal',
  templateUrl: 'shift-modal.html',
})
export class ShiftModalPage {

  	resobject: Resobject;
	list_shift_original: Array<{ id: string, nama: string }>;
	list_shift: Array<{ id: string, nama: string }>;
	loading;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private localStorageService: LocalStorageService,
		public karyawanProvider: KaryawanProvider, ) {
	}

	presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.loading.present();
    }

	ionViewDidLoad() {
		this.presentLoadingDefault();
		this.getListShift();
	}

	dismiss(karyawan) {
		this.viewCtrl.dismiss(karyawan);
	}

	search(searchEvent?) {
		let term = searchEvent.target.value
		if (term.trim() === '' || term.trim().length < 3) {
			this.list_shift = this.list_shift_original;
		} else {
			this.list_shift = [];
			for (let d of this.list_shift_original) {
				let nama = d.nama.toLowerCase();
				if (nama.includes(term.toLowerCase())) {
					this.list_shift.push(d);
				}
			}
		}
	}

	private getListShift() {
		this.list_shift_original = [];
		this.list_shift = [];
		if(this.localStorageService.get('list_shift')!=null){
			let data = JSON.parse(this.localStorageService.get('list_shift')+'');
			for (let key in data) {
				this.list_shift.push({
					id: key,
					nama: data[key]
				});
				this.list_shift_original.push({
					id: key,
					nama: data[key]
				});
			}
			this.loading.dismiss();
		}else{
			this.karyawanProvider.listShift().subscribe(Resobject => {
				this.resobject = Resobject;
				if (Resobject.code == 400) {
					console.log(Resobject.message);
					this.loading.dismiss();
				} else if (Resobject.code == 200) { //berhasil login
					this.localStorageService.set("list_shift",JSON.stringify(Resobject.data));
					let data = Resobject.data;
					for (let key in data) {
						this.list_shift.push({
							id: key,
							nama: data[key]
						});
						this.list_shift_original.push({
							id: key,
							nama: data[key]
						});
					}
					this.loading.dismiss();
				}
			})
		}
	}

}
