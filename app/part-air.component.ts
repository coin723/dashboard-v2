import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
import { ValueDisplayPipe, KeyDisplayPipe } from './data-display.pipe';

@Component({
    selector: 'div.air',
    templateUrl: 'app/part-air.component.html',
    pipes: [ValueDisplayPipe, KeyDisplayPipe]
})
export class PartAirComponent implements OnInit {
    airGraph_main: {};
    airGraph_sub: {};

    airGraph_mainKeys = ['AvgAirTemp'];
    airGraph_subKeys: string[];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        let res = this.dataService.getMockAirGraph();

        let lastIndex = res.data.length - 1;
        let rawData = res.data[lastIndex];

        Object.keys(rawData).forEach(key => {
            if (rawData[key] === null) rawData[key] = "기록 없음";
        });

        let avgKeys = Object.keys(rawData).filter(key => key.search(/^Avg/) !== -1);
        avgKeys = avgKeys.filter(value => value.search(/^AvgOut/) === -1 && value.search(/^AvgDew/) === -1 && value.search(/^AvgRain/) === -1);

        let result_main = {};
        let result_sub = {};
        let result_subKeys = [];
        let i = 0;
        avgKeys.forEach(key => {
            switch(this.airGraph_mainKeys.findIndex(mainKey => mainKey === key)) {
                case -1:
                    result_subKeys[i++] = key;
                    result_sub[key] = rawData[key];
                    break;
                default:
                    result_main[key] = rawData[key];
            }
        });

        this.airGraph_main = result_main;
        this.airGraph_sub = result_sub;
        this.airGraph_subKeys = result_subKeys;
    }
}