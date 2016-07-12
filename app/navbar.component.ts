import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ITEMS } from './navbar-item'; 

@Component({
    selector: 'navbar.navbar.navbar-default.navbar-fixed-top',
    templateUrl: 'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    items: string[];

    ngOnInit() {
        this.items = ITEMS;
    }
}