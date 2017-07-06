import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'interval-selector',
    template: `<ion-datetime displayFormat="HH:mm" 
        [ngModel]="intervalStr" 
        (ngModelChange)=onDateTimeChange($event)></ion-datetime>`
})
export class IntervalSelectorComponent {
    private intervalStr: string = '00:00';
    private _interval: number = 0;
    
    @Input() 
    set interval(interval: number) {
        this._interval = interval;
        let mins = ~~(interval/60);
        let hrs = ~~(mins/60);
        mins = mins % 60;
        this.intervalStr = `${hrs}:${mins}`;
    }

    get interval(): number {
        return this._interval;
    }

    @Output() intervalChange = new EventEmitter<number>()

    onDateTimeChange($event) {
        console.log(`Something changed ${$event}`);
        let newValue = $event.value;
        const [hrs, mins] = newValue.split(':');
        this._interval = 60*(+hrs*60 + (+mins));
        this.intervalChange.emit(this._interval);
    }

    /**
     *     
    

     */
}