import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";
//import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  interval: number;
  counting: boolean;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.counting = true;
    this.interval = navParams.get('interval');
    const oneSecond = 1000;
    let timer = Observable.timer(oneSecond, oneSecond);
    this.subscription = timer.subscribe( t => {
      if (!this.counting) {
        return;
      }
      this.interval--;
      if (this.interval === 0) {
        this.subscription.unsubscribe();
        this.navCtrl.pop();
      }
    });
  }

  pauseCountDown() {
    this.counting = !this.counting;
  }

  stopCountDown() {
    this.subscription.unsubscribe();
    this.navCtrl.pop();
  }

}
