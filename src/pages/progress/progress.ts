import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  interval: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.interval = navParams.get('interval');
  }

  stopCountDown() {
    console.log(this.interval);
    console.log(`Counting ${this.interval} minutes`);
  }

}
