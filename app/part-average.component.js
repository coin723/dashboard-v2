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
var PartAverageComponent = (function () {
    function PartAverageComponent(dataService) {
        this.dataService = dataService;
    }
    PartAverageComponent.prototype.ngOnInit = function () {
        this.wholeAvg = this.dataService.getMockWholeAvg();
        this.wholeAvg_keys = Object.keys(this.wholeAvg);
    };
    PartAverageComponent = __decorate([
        core_1.Component({
            selector: 'div.average',
            templateUrl: 'app/part-average.component.html',
            styles: ['.col-md-2 {width: 20%;}'],
            pipes: [data_display_pipe_1.ValueDisplayPipe, data_display_pipe_1.KeyDisplayPipe]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], PartAverageComponent);
    return PartAverageComponent;
}());
exports.PartAverageComponent = PartAverageComponent;
//# sourceMappingURL=part-average.component.js.map