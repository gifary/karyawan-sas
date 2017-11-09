import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { NavigationPage } from '../pages/navigation/navigation';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LogoutPage } from '../pages/logout/logout';
import { ListPermitPage } from '../pages/list-permit/list-permit';
import { PermitPage } from '../pages/permit/permit';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { ListPermitProsesPage } from '../pages/list-permit-proses/list-permit-proses';
import { ListPermitNotifPage} from '../pages/list-permit-notif/list-permit-notif';
import { ListSessionPage } from '../pages/list-session/list-session';

import { KaryawanProvider } from '../providers/karyawan/karyawan';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { routing } from './app.routing';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CalendarModule } from "ion2-calendar";
import { Camera } from '@ionic-native/camera';
import { Push} from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    NavigationPage,
    LoginPage,
    HomePage,
    AboutPage,
    LogoutPage,
    ListPermitPage,
    PermitPage,
    ChatRoomPage,
    QrcodePage,
    ListPermitProsesPage,
    ListPermitNotifPage,
    ListSessionPage
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
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NavigationPage,
    HomePage,
    AboutPage,
    LogoutPage,
    ListPermitPage,
    PermitPage,
    ChatRoomPage,
    QrcodePage,
    ListPermitProsesPage,
    ListPermitNotifPage,
    ListSessionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KaryawanProvider,
    Camera
  ]
})
export class AppModule {}
