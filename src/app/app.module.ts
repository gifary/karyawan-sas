import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { NavigationPage } from '../pages/navigation/navigation';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';
import { ListPermitPageModule } from '../pages/list-permit/list-permit.module';
import { PermitPage } from '../pages/permit/permit';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { ListPermitProsesPage } from '../pages/list-permit-proses/list-permit-proses';
import { ListPermitNotifPage} from '../pages/list-permit-notif/list-permit-notif';
import { ListSessionPage } from '../pages/list-session/list-session';
import { ListKaryawanModalPage } from '../pages/list-karyawan-modal/list-karyawan-modal';
import { ChangeSchedulePage } from '../pages/change-schedule/change-schedule';
import { ListChangeSchedulePage } from '../pages/list-change-schedule/list-change-schedule';
import { ShiftModalPage } from '../pages/shift-modal/shift-modal';
import { ListLateEmployeePage } from '../pages/list-late-employee/list-late-employee';
import { FormApprovalPage } from '../pages/form-approval/form-approval';


import { KaryawanProvider } from '../providers/karyawan/karyawan';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { routing } from './app.routing';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CalendarModule } from "ion2-calendar";
import { Camera } from '@ionic-native/camera';
import { Push} from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    NavigationPage,
    // LoginPage,
    HomePage,
    LogoutPage,
    // ListPermitPage,
    PermitPage,
    QrcodePage,
    ListPermitProsesPage,
    ListPermitNotifPage,
    ListSessionPage,
    ListKaryawanModalPage,
    ChangeSchedulePage,
    ListChangeSchedulePage,
    ShiftModalPage,
    ListLateEmployeePage,
    FormApprovalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LocalStorageModule.withConfig({
        prefix: 'karyawan-sas',
        storageType: 'localStorage'
    }),
    routing,
    NgxQRCodeModule,
    CalendarModule,
    ListPermitPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage,
    NavigationPage,
    HomePage,
    LogoutPage,
    // ListPermitPage,
    PermitPage,
    QrcodePage,
    ListPermitProsesPage,
    ListPermitNotifPage,
    ListSessionPage,
    ListKaryawanModalPage,
    ShiftModalPage,
    ChangeSchedulePage,
    ListChangeSchedulePage,
    ListLateEmployeePage,
    FormApprovalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KaryawanProvider,
    Camera,
    Keyboard,
    LoginProvider
  ]
})
export class AppModule {}
