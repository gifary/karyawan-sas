import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NavigationPage } from '../pages/navigation/navigation';
import { AboutPage } from '../pages/about/about';
import { LogoutPage } from '../pages/logout/logout';
import { ListPermitPage } from '../pages/list-permit/list-permit';
import { PermitPage } from '../pages/permit/permit';

import { KaryawanProvider } from '../providers/karyawan/karyawan';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { routing } from './app.routing';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CalendarModule } from "ion2-calendar";
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    NavigationPage,
    HomePage,
    LoginPage,
    AboutPage,
    LogoutPage,
    ListPermitPage,
    PermitPage

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
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NavigationPage,
    AboutPage,
    LogoutPage,
    ListPermitPage,
    PermitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KaryawanProvider,
    Camera
  ]
})
export class AppModule {}
