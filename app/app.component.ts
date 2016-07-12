import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import './rxjs-operators';

import { ITEMS } from './navbar-item';
import { DataService } from './data.service';

@Component({
  selector: 'body.with-top-navbar',
  templateUrl: 'app/app.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ HTTP_PROVIDERS, DataService ]
})
export class AppComponent implements OnInit{
  items: string[];

  farmList: any;
  errorMessage: any;

  constructor(private dataService: DataService) {};
  
  ngOnInit() {
    this.items = ITEMS;
    
    /*this.dataService.getFarmList()
      .subscribe(list => this.farmList = list, error => this.errorMessage = <any>error);*/
  }
}