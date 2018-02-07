import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';
import { Resobject } from '../../models/Resobject';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the ListKaryawanModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-list-karyawan-modal',
	templateUrl: 'list-karyawan-modal.html',
})
export class ListKaryawanModalPage {
	id: number = this.navParams.get('id');
	resobject: Resobject;
	list_karyawan_original: Array<{ id: string, nama: string }>;
	list_karyawan: Array<{ id: string, nama: string }>;
	loading;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private localStorageService: LocalStorageService,
		public loadingCtrl: LoadingController,
		public keyboard: Keyboard,
		public karyawanProvider: KaryawanProvider ) {
		this.presentLoadingDefault();
		if (this.id == 3) {
			this.getListSecurity();
		} else {
			this.getListKaryawan();
		}
	}

	presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.loading.present();
    }

	ionViewDidLoad() {
		this.keyboard.close();
		
	}

	dismiss(karyawan) {
		this.viewCtrl.dismiss(karyawan);
	}

	search(searchEvent?) {
		let term = searchEvent.target.value
		if (term.trim() === '' || term.trim().length < 3) {
			this.list_karyawan = this.list_karyawan_original;
		} else {
			this.list_karyawan = [];
			for (let d of this.list_karyawan_original) {
				let nama = d.nama.toLowerCase();
				if (nama.includes(term.toLowerCase())) {
					this.list_karyawan.push(d);
				}
			}
		}
	}

	private getListKaryawan() {
		let m_lokasi_id = parseInt(this.localStorageService.get('m_lokasi_id') + '');
		this.list_karyawan = [];
		this.list_karyawan_original = [];
		if(this.localStorageService.get("list_karyawan")!=null){
			let data = JSON.parse(this.localStorageService.get("list_karyawan")+'');
			for (let key in data) {
				this.list_karyawan.push({
					id: key,
					nama: data[key]
				});
				this.list_karyawan_original.push({
					id: key,
					nama: data[key]
				});
			}
			this.loading.dismiss();
		}else{
			this.karyawanProvider.listKaryawan(m_lokasi_id).subscribe(Resobject => {
				this.resobject = Resobject;
				if (Resobject.code == 400) {
					this.loading.dismiss();
					console.log(Resobject.message);
				} else if (Resobject.code == 200) { //berhasil login
					this.localStorageService.set("list_karyawan",JSON.stringify(Resobject.data));
					let data = Resobject.data;
					for (let key in data) {
						this.list_karyawan.push({
							id: key,
							nama: data[key]
						});
						this.list_karyawan_original.push({
							id: key,
							nama: data[key]
						});
					}
				}
				this.loading.dismiss();
			})
		}
		// this.loading.dismiss();
	}

	private getListSecurity() {
		let m_lokasi_id = parseInt(this.localStorageService.get('m_lokasi_id') + '');
		this.list_karyawan = [];
		this.list_karyawan_original = [];
		if(this.localStorageService.get("list_security")!=null){
			let data = JSON.parse(this.localStorageService.get("list_security")+'');
			for (let key in data) {
				this.list_karyawan.push({
					id: key,
					nama: data[key]
				});
				this.list_karyawan_original.push({
					id: key,
					nama: data[key]
				});
			}
			this.loading.dismiss();
		}else{
			this.karyawanProvider.listSecurity(m_lokasi_id).subscribe(Resobject => {
				this.resobject = Resobject;
				if (Resobject.code == 400) {
					this.loading.dismiss();
				} else if (Resobject.code == 200) { //berhasil login
					this.localStorageService.set("list_security",JSON.stringify(Resobject.data));
					let data = Resobject.data;
					for (let key in data) {
						this.list_karyawan.push({
							id: key,
							nama: data[key]
						});
						this.list_karyawan_original.push({
							id: key,
							nama: data[key]
						});
					}
				}
				this.loading.dismiss();
			})
		}
		
	}

}
