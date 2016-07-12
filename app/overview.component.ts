import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { PartCctvComponent } from './part-cctv.component';
import { PartWaterComponent } from './part-water.component';
import { PartAirComponent } from './part-air.component';
import { PartAverageComponent } from './part-average.component';
import { PartLogisticsComponent } from './part-logistics.component';

@Component({
    selector: 'div.m-t-md',
    templateUrl: 'app/overview.component.html',
    styles: [
        `
        .icon-bar-graph:before {
            text-decoration: line-through;
        }

        .overview-component.main, .overview-component.main .hr-divider-content {
            background-color: #D9E8E1;
        }
        `
    ],
    directives: [
        PartCctvComponent,
        PartWaterComponent,
        PartAirComponent,
        PartAverageComponent,
        PartLogisticsComponent
    ]
})
export class OverviewComponent implements AfterViewInit {
    ngAfterViewInit() {
        let element = <HTMLElement>document.querySelector('.col-md-8 .overview-component');
        element.style.height = Number(window.getComputedStyle(document.querySelector('.col-md-4 .overview-component')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .hr-divider')).getPropertyValue('line-height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('margin-bottom').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .average')).getPropertyValue('margin-top').match(/[0-9]+/)[0]) + 'px';
    }
}