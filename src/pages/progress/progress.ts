import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";


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
    const minute = 1000;
    let timer = Observable.timer(minute, minute);
    this.subscription = timer.subscribe( t => {
      this.interval--;
      if (this.interval === 0) {
        this.subscription.unsubscribe();
        console.log('Done!');
      }
    });
  }

  pauseCountDown() {
    console.log(`Current interval: ${this.interval}`);
  }

  stopCountDown() {
    this.subscription.unsubscribe();
    this.navCtrl.pop();
  }


}
