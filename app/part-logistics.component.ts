import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
import { ValueDisplayPipe, KeyDisplayPipe } from './data-display.pipe';

@Component({
    selector: 'div.logistics',
    templateUrl: 'app/part-logistics.component.html',
    pipes: [ValueDisplayPipe, KeyDisplayPipe]
})
export class PartLogisticsComponent implements OnInit {
    logistics: {};
    logistics_keys: string[];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        let rawData = this.dataService.getMockLogistics();
        let lastIndex = rawData.length - 1;
        let todayDelivered = 0;
        rawData[lastIndex].delivered.forEach((value) => {
            todayDelivered += value;
        });

        let result = {};

        switch (todayDelivered) {
            case 0:
                result['lastSales'] = rawData[lastIndex - 1].sales;
                let toDeliver = 0;
                rawData[lastIndex].toDeliver.forEach((value) => {
                    toDeliver += value;
                });
                result['toDeliver'] = toDeliver;
                break;
            default:
                result['lastSales'] = rawData[lastIndex].sales;
                let delivered = 0;
                result['lastDelivered'] = todayDelivered;
        }
        
        this.logistics = result;
        this.logistics_keys = Object.keys(result);
    }
}