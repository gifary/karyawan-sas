import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { KaryawanProvider } from '../../providers/karyawan/karyawan';
import { LocalStorageService } from 'angular-2-local-storage';
import { Resobject } from '../../models/resobject';

/**
 * Generated class for the ListKaryawanModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-list-karyawan-modal',
	templateUrl: 'list-karyawan-modal.html',
})
export class ListKaryawanModalPage {
	id: number = this.navParams.get('id');
	resobject: Resobject;
	list_karyawan_original: Array<{ id: string, nama: string }>;
	list_karyawan: Array<{ id: string, nama: string }>;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private localStorageService: LocalStorageService,
		public karyawanProvider: KaryawanProvider, ) {
	}

	ionViewDidLoad() {
		if (this.id == 3) {
			this.getListSecurity();
		} else {
			this.getListKaryawan();
		}
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

		return this.karyawanProvider.listKaryawan(m_lokasi_id).subscribe(Resobject => {
			this.resobject = Resobject;
			if (Resobject.code == 400) {
				console.log(Resobject.message);
			} else if (Resobject.code == 200) { //berhasil login
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
		})
	}

	private getListSecurity() {
		let m_lokasi_id = parseInt(this.localStorageService.get('m_lokasi_id') + '');
		this.list_karyawan = [];
		this.list_karyawan_original = [];
		return this.karyawanProvider.listSecurity(m_lokasi_id).subscribe(Resobject => {
			this.resobject = Resobject;
			if (Resobject.code == 400) {
			} else if (Resobject.code == 200) { //berhasil login
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
		})
	}

}
