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
var data_service_1 = require('./data.service');
var data_display_pipe_1 = require('./data-display.pipe');
var PartLogisticsComponent = (function () {
    function PartLogisticsComponent(dataService) {
        this.dataService = dataService;
    }
    PartLogisticsComponent.prototype.ngOnInit = function () {
        var rawData = this.dataService.getMockLogistics();
        var lastIndex = rawData.length - 1;
        var todayDelivered = 0;
        rawData[lastIndex].delivered.forEach(function (value) {
            todayDelivered += value;
        });
        var result = {};
        switch (todayDelivered) {
            case 0:
                result['lastSales'] = rawData[lastIndex - 1].sales;
                var toDeliver_1 = 0;
                rawData[lastIndex].toDeliver.forEach(function (value) {
                    toDeliver_1 += value;
                });
                result['toDeliver'] = toDeliver_1;
                break;
            default:
                result['lastSales'] = rawData[lastIndex].sales;
                var delivered = 0;
                result['lastDelivered'] = todayDelivered;
        }
        this.logistics = result;
        this.logistics_keys = Object.keys(result);
    };
    PartLogisticsComponent = __decorate([
        core_1.Component({
            selector: 'div.logistics',
            templateUrl: 'app/part-logistics.component.html',
            pipes: [data_display_pipe_1.ValueDisplayPipe, data_display_pipe_1.KeyDisplayPipe]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], PartLogisticsComponent);
    return PartLogisticsComponent;
}());
exports.PartLogisticsComponent = PartLogisticsComponent;
//# sourceMappingURL=part-logistics.component.js.map