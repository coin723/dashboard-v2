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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var mock_data_1 = require('./mock-data');
//import 'rxjs/add/operator/catch';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        //private rootUrl = 'http://54.199.243.128/';
        this.rootUrl = 'http://118.44.187.55/';
        this.farmListUrl = 'api/get/farm/list';
        this.waterHistoryUrl = 'api/get/watertank/history/graph';
        this.waterHistoryOrder = [];
    }
    DataService.prototype.getFarmList = function () {
        var queryUrl = this.rootUrl + this.farmListUrl;
        return this.http.get(queryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DataService.prototype.getWaterHistory = function (watertank_id, start_time, end_time, unit) {
        if (unit === undefined)
            unit = 'hour';
        var params = new http_1.URLSearchParams();
        params.set('watertank_id', String(watertank_id));
        params.set('start_time', start_time);
        params.set('end_time', end_time);
        params.set('unit', unit || 'hour');
        var queryUrl = this.attachUrl(this.waterHistoryUrl);
        return this.http.get(queryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DataService.prototype.getWeatherForecast = function () {
    };
    DataService.prototype.getMockWaterHistory = function () {
        return mock_data_1.waterTankHistory;
    };
    DataService.prototype.getMockAirGraph = function () {
        return mock_data_1.airGraph;
    };
    DataService.prototype.getMockWholeAvg = function () {
        return mock_data_1.mainAvg;
    };
    DataService.prototype.getMockLogistics = function () {
        return mock_data_1.logistics;
    };
    DataService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    DataService.prototype.attachUrl = function (segment) {
        return this.rootUrl + segment;
    };
    DataService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : (error.status ? error.status + " - " + error.statusText : 'Server error');
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map