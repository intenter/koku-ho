import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress'

export class SoundType {
  constructor(public readonly name: string, public readonly url: string) {
  }
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

  constructor(public navCtrl: NavController) {
    this.interval = '00:00';
    this.endWithCount = 1;
    this.endWithSoundType = this.sounds[0];
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
