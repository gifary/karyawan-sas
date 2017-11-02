import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from '../chat-room/chat-room';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['assets/css/style-be.css']
})
export class AboutPage {

  nickname = '';
 
  constructor(public navCtrl: NavController, private socket: Socket) { }
 
  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push(ChatRoomPage, { nickname: this.nickname });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
