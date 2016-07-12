import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
import { ValueDisplayPipe, KeyDisplayPipe } from './data-display.pipe';

@Component({
    selector: 'div.average',
    templateUrl: 'app/part-average.component.html',
    styles: ['.col-md-2 {width: 20%;}'],
    pipes: [ValueDisplayPipe, KeyDisplayPipe]
})
export class PartAverageComponent implements OnInit {
    wholeAvg: {};
    wholeAvg_keys: string[];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.wholeAvg = this.dataService.getMockWholeAvg();
        this.wholeAvg_keys = Object.keys(this.wholeAvg);
    }
}