"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var part_cctv_component_1 = require('./part-cctv.component');
var part_water_component_1 = require('./part-water.component');
var part_air_component_1 = require('./part-air.component');
var part_average_component_1 = require('./part-average.component');
var part_logistics_component_1 = require('./part-logistics.component');
var OverviewComponent = (function () {
    function OverviewComponent() {
    }
    OverviewComponent.prototype.ngAfterViewInit = function () {
        var element = document.querySelector('.col-md-8 .overview-component');
        element.style.height = Number(window.getComputedStyle(document.querySelector('.col-md-4 .overview-component')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .hr-divider')).getPropertyValue('line-height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('margin-bottom').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .average')).getPropertyValue('margin-top').match(/[0-9]+/)[0]) + 'px';
    };
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'div.m-t-md',
            templateUrl: 'app/overview.component.html',
            styles: [
                "\n        .icon-bar-graph:before {\n            text-decoration: line-through;\n        }\n\n        .overview-component.main, .overview-component.main .hr-divider-content {\n            background-color: #D9E8E1;\n        }\n        "
            ],
            directives: [
                part_cctv_component_1.PartCctvComponent,
                part_water_component_1.PartWaterComponent,
                part_air_component_1.PartAirComponent,
                part_average_component_1.PartAverageComponent,
                part_logistics_component_1.PartLogisticsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map