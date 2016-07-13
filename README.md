# README #

This is the guide for building and running new dashboard.

### What is this repository for? ###

* This is the collection of web pages, TypeScript files, JavsScript files, etc. for serving dashboard web site of Manna Farm which is a part of LIFE project.
* v0.1.0-alpha (in progress)
* [Live demo]() (Currently there's no server to run the demo)

### How do I get set up? ###

* Given the source files within a directory, run this command at the command line at the location of that directory:

        npm install
Then all modules and setting files needed should be installed. Without these modules the web pages cannot be rendered properly. Surely this step is needed just once as long as the installed files exist.

    After installation of modules and etc., it can be viewed through Safari and Edge (and Chrome for mobile devices).

* Most of explicit and vital configurations are set in index.html:

        <!DOCTYPE html>
        <html>
          <head>
            <base href="/" />
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ...
            <link href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
            
            <link href="assets/css/toolkit-light.min.css" rel="stylesheet" />
        
            <style>
              /* note: this is a hack for ios iframe for bootstrap themes shopify page */
              /* this chunk of css is not part of the toolkit :) */
              body {
                width: 1px;
                min-width: 100%;
                *width: 100%;
              }
            </style>
            
            <!-- 1. Load libraries -->
             <!-- Polyfill(s) for older browsers -->
            <script src="node_modules/core-js/client/shim.min.js"></script>
            <script src="node_modules/zone.js/dist/zone.js"></script>
            <script src="node_modules/reflect-metadata/Reflect.js"></script>
            <script src="node_modules/systemjs/dist/system.src.js"></script>
            <!-- 2. Configure SystemJS -->
            <script src="systemjs.config.js"></script>
            <script>
              System.import('app').catch(function(err){ console.error(err); });
            </script>
          </head>
          <!-- 3. Display the application -->
          <body class="with-top-navbar">
            <script
              src="https://code.jquery.com/jquery-3.0.0.min.js"
              integrity="sha256-JmvOoLtYsmqlsWxa7mDSLMwa6dZ9rrIdtrrVYRnDRH0="
              crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.min.js"></script>
            <script src="assets/js/toolkit.min.js"></script>
            <script>
              // execute/clear BS loaders for docs
              $(function(){while(window.BS&&window.BS.loader&&window.BS.loader.length){(window.BS.loader.pop())()}})
            </script>
          </body>
        </html>

* Dependencies (list from package.json)
    * [Angular](https://angular.io)
    * [angular2 in-memory-web-api](https://github.com/angular/in-memory-web-api) (may used to build mock service for some tests; not likely to be essential in public builds)
    * [Bootstrap](http://v4-alpha.getbootstrap.com) (fetched from CDN by <link> and <script> tags)
    * [Bootstrap Dashboard Theme](http://themes.getbootstrap.com/products/dashboard) (should be purchased)
    * [core-js](https://github.com/zloirock/core-js)
    * [Chart.js](http://chartjs.org) (fetched from CDN by <script> tag)
        * Chart.js is required by Bootstrap Dashboard Theme. Originally it implements Chart.js v1, but now the toolkit of the theme is adjusted to work with Chart.js v2. However it is not tested yet.
    * [jQuery](http://jquery.com) (fetched from CDN by <script> tag)
    * [Metadata Reflection API](https://github.com/rbuckton/ReflectDecorators)
    * [The Reactive Extensions for JavaScript (RxJS)](https://github.com/Reactive-Extensions/RxJS)
    * [SystemJS](https://github.com/systemjs/systemjs)
    * [Zone.js](https://github.com/btford/zone.js/)

* Development Dependencies (list from package.json)
    * [Concurrently](https://github.com/kimmobrunfeldt/concurrently) (used in configuration for 'npm start' command; maybe not necessary)
    * [lite-server](https://github.com/johnpapa/lite-server) (not necessary; you may use any server on your test, publish, etc.)
    * [Typings](https://github.com/typings/typings) (managing TypeScript's type definition; once the final version of .js files are published, this may be of no use)
    * [TypeScript](http://www.typescriptlang.org/)

* Database configuration(?)
    * This dashboard is to use API to retrieve data. This process can be done through XMLHttpRequest with CORS by built-in HTTP client module of Angular, or any other possible ways.
* How to run tests
    * This site should be able to be served even with simple HTTP server. (e.g. http-server)
* Deployment instructions
    * [Architecture Overview](https://angular.io/docs/ts/latest/guide/architecture.html) may help understanding the Angular code.
    * Bootstrap's grid system is essential here determining each element's size. [Follow this link](http://v4-alpha.getbootstrap.com/layout/grid/) to take a look of the document describing the grid system of Bootstrap 4.
    * Documentation for Bootstrap Dashboard Theme is [here](https://bootstrap-themes.github.io/dashboard/docs/index.html). Pictograms, dividers, status cards, and modals(not yet implemented) are from the theme. Get yourself reminded about that the source files are not free. It should be purchased.
    * Novice or higher level of TypeScript skill is helpful. Follow the steps in [quick start document](http://www.typescriptlang.org/docs/tutorial.html) of TypeScript to quickly get used to the basics of TypeScript.
    * Actual pages are rendered by accordingly executing .js files in /app directory. Each of these is derived from paired `.ts` files.
    * `main.ts` is the main file fetching and organising other `.ts` files.
        
            import { bootstrap }    from '@angular/platform-browser-dynamic';
        
            import { AppComponent } from './app.component';
            import { APP_ROUTER_PROVIDERS } from './app.routes';
     
            bootstrap(AppComponent, [
                APP_ROUTER_PROVIDERS
            ]);

    * Each page consists of __components__. For a component, `.ts` file matching to the component is the core part. A component may include separate template file(.html) or stylesheet(.css) to implement itself into the web page. It is a common convention to name such file as same as that of related component's `.ts` file.

            import { Component } from '@angular/core';

            @Component({
                selector: 'div.cctv',
                templateUrl: 'app/part-cctv.component.html'
            })
            export class PartCctvComponent {

            }

    * A __service__ functions like a process at runtime, being able to deal with client's requests and etc.

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

                private rootUrl = 'http://118.44.187.55/';
                private farmListUrl = 'api/get/farm/list';
                private waterHistoryUrl = 'api/get/watertank/history/graph'

                private waterHistoryOrder = [
        
                ]

                getFarmList(): Observable<any> {
                    ...
                }

                getWaterHistory(watertank_id: number, start_time: string, end_time: string, unit: string): Observable<{}> {
                    ...
                }

                getWeatherForecast() {
                    ...
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

    * __Router__ lets user navigate through the web site's components based on defined __routes__, each element of which contains path and component to direct to generally.

            import { provideRouter, RouterConfig } from '@angular/router';

            import { OverviewComponent } from './overview.component';

            const routes: RouterConfig = [
                {
                    path: '',
                    redirectTo: 'overview',
                    terminal: true
                },
                {
                    path: 'overview',
                    component: OverviewComponent
                }
            ];

            export const APP_ROUTER_PROVIDERS = [
                provideRouter(routes)
            ];

With the current `package.json`, `npm start` will automatically generate .js files from `.ts` files - which is actually done by `tsc`. And any change occurred while the server initiated by the command is turned on will be applied to web browser's view by automatic refresh without restarting the server.

Below is the content of `overview.component.ts` with comments within. Reading this may help understanding the way this site works.

```
#!typescript
// Import modules from Angular packages
// Component is used to decorate the component to be exported with an object containing several properties(e.g. selector, template).
// AfterViewInit is implemented by the component with ngAfterViewInit() method to do something after the view of the component is loaded.
import { Component, AfterViewInit } from '@angular/core';
// Router is used to let user navigate through components.
import { Router } from '@angular/router';

// Import components those are to be viewed inside this component
import { PartCctvComponent } from './part-cctv.component';
import { PartWaterComponent } from './part-water.component';
import { PartAirComponent } from './part-air.component';
import { PartAverageComponent } from './part-average.component';
import { PartLogisticsComponent } from './part-logistics.component';

// Component decorator
@Component({
    selector: 'div.m-t-md', // CSS selector of HTML element in which the component is viewed. If corresponding element exists, the component is viewed inside that element. If not, the component may not be viewed anywhere.
    // Such selector does not have to indicate 'pure-HTML' element; for example, <my-app> or whatever you prefer can be used.
    templateUrl: 'app/overview.component.html', // Location of HTML file by which the component is visualised. You can use 'template' property instead, assigning your own HTML code string as its value.
    styles: [
        `
        .icon-bar-graph:before {
            text-decoration: line-through;
        }

        .overview-component.main, .overview-component.main .hr-divider-content {
            background-color: #D9E8E1;
        }
        `
    ], // CSS style configuration. This can be replaced by 'styleUrls' with an array of locations of .css files to be referred as its value.
    directives: [
        PartCctvComponent,
        PartWaterComponent,
        PartAirComponent,
        PartAverageComponent,
        PartLogisticsComponent
    ] // This could be considered as the list of classes - components, services, etc. - this component refers to render itself.
})
export class OverviewComponent implements AfterViewInit { // Export OverviewComponent as a class and let it implement AfterViewInit
    ngAfterViewInit() { // When all of views set to be loaded in this component become complete, do the below contained in the brackets
        let element = <HTMLElement>document.querySelector('.col-md-8 .overview-component');
        element.style.height = Number(window.getComputedStyle(document.querySelector('.col-md-4 .overview-component')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .hr-divider')).getPropertyValue('line-height').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-4 .statcard')).getPropertyValue('margin-bottom').match(/[0-9]+/)[0]) - Number(window.getComputedStyle(document.querySelector('.col-md-8 .overview-component.main .average')).getPropertyValue('margin-top').match(/[0-9]+/)[0]) + 'px';
    }
}
```
                                                                                                                                                            
### Contribution guidelines ###
(to be done maybe)

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact