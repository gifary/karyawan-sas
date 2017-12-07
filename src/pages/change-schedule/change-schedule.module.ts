import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeSchedulePage } from './change-schedule';

@NgModule({
  declarations: [
    ChangeSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeSchedulePage),
  ],
})
export class ChangeSchedulePageModule {}
