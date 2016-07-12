import { Pipe, PipeTransform } from '@angular/core';

import { dataKeyName } from './data-pipe-form';

@Pipe({name: 'valueDisplay'})
export class ValueDisplayPipe implements PipeTransform {
    transform(value, key: string) {
        let nameArray = /[A-Z][a-z]+$/.exec(key);
        let name;
        if (nameArray !== null) {
            name = nameArray[0];
        } else {
            name = null;
        }

        if (typeof value === 'number') value = Math.round(value * 100) / 100;
        
        switch(name) {
            case null:
                switch(key.replace('Avg', '')) {
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
    }
}

@Pipe({name: 'keyDisplay'})
export class KeyDisplayPipe implements PipeTransform {
    transform(key: string) {
        return dataKeyName.get(key);
    }
}