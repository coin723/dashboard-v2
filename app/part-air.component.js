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
var PartAirComponent = (function () {
    function PartAirComponent(dataService) {
        this.dataService = dataService;
        this.airGraph_mainKeys = ['AvgAirTemp'];
    }
    PartAirComponent.prototype.ngOnInit = function () {
        var _this = this;
        var res = this.dataService.getMockAirGraph();
        var lastIndex = res.data.length - 1;
        var rawData = res.data[lastIndex];
        Object.keys(rawData).forEach(function (key) {
            if (rawData[key] === null)
                rawData[key] = "기록 없음";
        });
        var avgKeys = Object.keys(rawData).filter(function (key) { return key.search(/^Avg/) !== -1; });
        avgKeys = avgKeys.filter(function (value) { return value.search(/^AvgOut/) === -1 && value.search(/^AvgDew/) === -1 && value.search(/^AvgRain/) === -1; });
        var result_main = {};
        var result_sub = {};
        var result_subKeys = [];
        var i = 0;
        avgKeys.forEach(function (key) {
            switch (_this.airGraph_mainKeys.findIndex(function (mainKey) { return mainKey === key; })) {
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
    };
    PartAirComponent = __decorate([
        core_1.Component({
            selector: 'div.air',
            templateUrl: 'app/part-air.component.html',
            pipes: [data_display_pipe_1.ValueDisplayPipe, data_display_pipe_1.KeyDisplayPipe]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], PartAirComponent);
    return PartAirComponent;
}());
exports.PartAirComponent = PartAirComponent;
//# sourceMappingURL=part-air.component.js.map