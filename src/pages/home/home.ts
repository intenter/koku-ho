import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress'
import * as _ from 'lodash'

export class SoundType {
  constructor(public readonly name: string, public readonly url: string) {
  }
}

export class SoundSignal {
  constructor(
    public delay: number, 
    public times: number,
    public soundType: SoundType) {}
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  interval: string;
  endWithCount: number;
  endWithSoundType: SoundType;

  sounds: SoundType[] = [
    new SoundType('Door Bell', 'audio/dorbell.mp3'), 
    new SoundType('Gong', 'audio/gong.mp3')];

  additionalSignals: SoundSignal[] = [new SoundSignal(1, 3, this.sounds[0])];

  constructor(public navCtrl: NavController) {
    this.interval = '00:00';
    this.endWithCount = 1;
    this.endWithSoundType = this.sounds[0];
  }

  addSignal() {
    this.additionalSignals.push(new SoundSignal(0, 3, this.sounds[1]));
  }

  deleteSignal(signal: SoundSignal) {
    _.remove(this.additionalSignals, (item) => {
      return item === signal
    });
  }

  startCountDown() {
    const [hrs, mins] = this.interval.split(':');
    const intervalInSec: number = 60*(+hrs*60 + (+mins));
    console.log(`Counting ${intervalInSec} seconds`);
    console.log(`Selected sound: ${JSON.stringify(this.endWithSoundType)}`);
    let options = {
      interval: intervalInSec,
      endWithCount: this.endWithCount,
      endWithSoundType: this.endWithSoundType
    };
    this.navCtrl.push(ProgressPage, options);
  }

}
