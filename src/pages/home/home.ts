import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  interval: string;
  constructor(public navCtrl: NavController) {
    this.interval = '00:00';
  }

  startCountDown() {
    console.log(this.interval);
    const [hrs, mins] = this.interval.split(':');
    const intervalInMins: number = +hrs*60 + (+mins);
    console.log(`Counting ${intervalInMins} minutes`);
    this.navCtrl.push(ProgressPage, {interval: intervalInMins});
  }

}
