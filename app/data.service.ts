import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
declare var $:JQueryStatic;

import { Observable } from 'rxjs/Observable';

import { waterTankHistory, airGraph, mainAvg, logistics } from './mock-data';

//import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    constructor(
        private http: Http
    ) {}

    //private rootUrl = 'http://54.199.243.128/';
    private rootUrl = 'http://118.44.187.55/';
    private farmListUrl = 'api/get/farm/list';
    private waterHistoryUrl = 'api/get/watertank/history/graph'

    private waterHistoryOrder = [
        
    ]

    getFarmList(): Observable<any> {
        let queryUrl = this.rootUrl + this.farmListUrl;

        return this.http.get(queryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getWaterHistory(watertank_id: number, start_time: string, end_time: string, unit: string): Observable<{}> {
        if(unit === undefined) unit = 'hour';

        let params = new URLSearchParams();
        params.set('watertank_id', String(watertank_id));
        params.set('start_time', start_time);
        params.set('end_time', end_time);
        params.set('unit', unit || 'hour');

        let queryUrl = this.attachUrl(this.waterHistoryUrl);

        return this.http.get(queryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getWeatherForecast() {
        
    }

    getMockWaterHistory() {
        return waterTankHistory;
    }

    getMockAirGraph() {
        return airGraph;
    }
    
    getMockWholeAvg() {
        return mainAvg;
    }

    getMockLogistics() {
        return logistics;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private attachUrl(segment: string) {
        return this.rootUrl + segment;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}