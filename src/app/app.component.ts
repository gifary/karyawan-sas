import { Component,ViewChild } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import { LocalStorageService } from 'angular-2-local-storage';
import { KaryawanProvider } from '../providers/karyawan/karyawan';
import { ListPermitNotifPage} from '../pages/list-permit-notif/list-permit-notif';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public alertCtrl:AlertController, 
    public push: Push,
    public fcm: FCM,
    public localstorage: LocalStorageService,
    public karyawanprovider: KaryawanProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
      this.initFCM();
      // this.nav.push(ListPermitNotifPage,{});
    });
  }

  initFCM(){
    this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        // this.rootPage = ListPermitNotifPage;
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
        let youralert = this.alertCtrl.create({
          title: data.title,
          message: data.message
        });
        youralert.present();
      };
    })

    this.fcm.onTokenRefresh().subscribe(token=>{
      let old_token = this.localstorage.get("token").toString();
      if(old_token!=null && old_token!='' && old_token!='undifined' ){
        let user_id = this.localstorage.get("user_id").toString();
        if(user_id!=null && user_id!='' && user_id!='undifined'){
          this.karyawanprovider.updatetoken(parseInt(user_id),old_token,token);
        }
      }
    })
  }

  pushsetup() {
    const options: PushOptions = {
     android: {},
     ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
     },
     windows: {},
     browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
     }
  };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: notification.title,
        message: notification.message
      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}

