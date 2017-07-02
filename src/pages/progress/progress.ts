import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs';
import { NativeAudio } from '@ionic-native/native-audio';
import { SoundType } from '../home/home';


@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  interval: number;
  counting: boolean;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
    const endWithSoundType = navParams.get('endWithSoundType');
    this.nativeAudio.preloadSimple(endWithSoundType.name, endWithSoundType.url)
    .then(() => {
      console.log('Sound loaded')
    }, err => {
      console.log(err);
    })
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
        this.playSounds(endWithSoundType, navParams.get('endWithCount')).then(()=>{
          //this.navCtrl.pop();
        });        
      }
    });
  }

  /**
   * Repeats promise several times running them in sequence
   * @param promiseFactory function that returns a promise
   * @param {number} count how many times to repeat the promise
   */
  repeatPromise(promiseFactory, count) {
    if (count > 0) {
        return promiseFactory().then(() => this.repeatPromise(promiseFactory, count - 1));
    } else {
        return Promise.resolve();
    }
  }

  /**
   * Playes the sound of the given ID. The promise will be resolved when
   * then sound stops playing
   * @param {string} id ID of the preloaded sound
   */
  playSoundAndWhenDone(id: string) {
    return new Promise((resolve, reject) => {
      this.nativeAudio.play(id, () => {
        resolve();
      }).catch(reject)
    });
  }

  /**
   * Plase particular sound given number of times
   * @param {SoundType} type type of sound
   * @param {number} count how many times to play
   */
  playSounds(type: SoundType, count: number) {
    return this.repeatPromise(() => {
      return this.playSoundAndWhenDone(type.name);
    }, count);
  }

  pauseCountDown() {
    this.counting = !this.counting;
  }

  stopCountDown() {
    this.subscription.unsubscribe();
    this.navCtrl.pop();
  }

}
