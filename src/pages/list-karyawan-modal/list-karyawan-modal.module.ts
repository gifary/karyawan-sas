import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListKaryawanModalPage } from './list-karyawan-modal';

@NgModule({
  declarations: [
    ListKaryawanModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListKaryawanModalPage),
  ],
})
export class ListKaryawanModalPageModule {}
