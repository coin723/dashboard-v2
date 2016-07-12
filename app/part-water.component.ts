import { Component, OnInit } from '@angular/core'

import { DataService } from './data.service';
import { ValueDisplayPipe, KeyDisplayPipe } from './data-display.pipe';

@Component({
    selector: 'div.water',
    templateUrl: 'app/part-water.component.html',
    pipes: [ValueDisplayPipe, KeyDisplayPipe]
})
export class PartWaterComponent implements OnInit {
    waterHistory_main: {};
    waterHistory_sub: {};

    waterHistory_mainKeys = ['AvgWaterTemp', 'AvgEC', 'AvgDO', 'AvgpH'];
    waterHistory_subKeys: string[];

    constructor(private dataService: DataService) {}
    
    ngOnInit() {
        let res = this.dataService.getMockWaterHistory();

        let lastIndex = res.data.length - 1;
        let rawData = res.data[lastIndex];

        Object.keys(rawData).forEach(key => {
            if (rawData[key] === null) rawData[key] = "기록 없음";
        })

        let avgKeys = Object.keys(rawData).filter(key => key.search(/^Avg/) !== -1);

        let result_main = {};
        let result_sub = {};
        let result_subKeys = [];
        let i = 0;
        avgKeys.forEach(key => {
            switch(this.waterHistory_mainKeys.findIndex(mainKey => mainKey === key)) {
                case -1:
                    result_subKeys[i++] = key;
                    result_sub[key] = rawData[key];
                    break;
                default:
                    result_main[key] = rawData[key];
            }
        });
        
        this.waterHistory_main = result_main;
        this.waterHistory_sub = result_sub;
        this.waterHistory_subKeys = result_subKeys;

        /*this.dataService.getWaterHistory(1, '2016-06-14 00:00:00', '2016-06-15 00:00:00', 'hour')
            .subscribe(
                res => {
                    let lastIndex = res.data.length - 1;
                    let rawData = res.data[lastIndex];

                    let avgKeys = Object.keys(rawData).filter(key => { return key.search(/^Avg/) !== -1; });

                    let result = {};
                    avgKeys.forEach(key => {
                        if (rawData[key] !== null) {
                            result[key] = rawData[key];
                        } else {
                            result[key] = "기록 없음";
                        }
                    });

                    this.waterHistory = result;        
                    this.waterHistory_keys = Object.keys(this.waterHistory);
                }
            );*/
    }
}