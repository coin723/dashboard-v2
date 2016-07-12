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
var data_pipe_form_1 = require('./data-pipe-form');
var ValueDisplayPipe = (function () {
    function ValueDisplayPipe() {
    }
    ValueDisplayPipe.prototype.transform = function (value, key) {
        var nameArray = /[A-Z][a-z]+$/.exec(key);
        var name;
        if (nameArray !== null) {
            name = nameArray[0];
        }
        else {
            name = null;
        }
        if (typeof value === 'number')
            value = Math.round(value * 100) / 100;
        switch (name) {
            case null:
                switch (key.replace('Avg', '')) {
                    case 'DO':
                    case 'CO2':
                        return value + 'ppm';
                    default:
                        return value;
                }
            case 'Temp':
                return value + '℃';
            case 'Humidity':
                return value + '%';
            case 'Sales':
                return '₩' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            case 'Deliver':
            case 'Delivered':
                return value + '상자';
            default:
                return value;
        }
    };
    ValueDisplayPipe = __decorate([
        core_1.Pipe({ name: 'valueDisplay' }), 
        __metadata('design:paramtypes', [])
    ], ValueDisplayPipe);
    return ValueDisplayPipe;
}());
exports.ValueDisplayPipe = ValueDisplayPipe;
var KeyDisplayPipe = (function () {
    function KeyDisplayPipe() {
    }
    KeyDisplayPipe.prototype.transform = function (key) {
        return data_pipe_form_1.dataKeyName.get(key);
    };
    KeyDisplayPipe = __decorate([
        core_1.Pipe({ name: 'keyDisplay' }), 
        __metadata('design:paramtypes', [])
    ], KeyDisplayPipe);
    return KeyDisplayPipe;
}());
exports.KeyDisplayPipe = KeyDisplayPipe;
//# sourceMappingURL=data-display.pipe.js.map