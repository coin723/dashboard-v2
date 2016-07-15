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
    * [Bootstrap](http://v4-alpha.getbootstrap.com) (merged into `toolkit-light.min.css` and `toolkit.min.js`)
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
    * [TypeScript](http://www.typescriptlang.org/)
    * [Typings](https://github.com/typings/typings) (managing TypeScript's type definition; once the final version of .js files are published, this may be of no use)

* Database configuration(?)
    * This dashboard is to use API to retrieve data. This process can be done through XMLHttpRequest with CORS by built-in HTTP client module of Angular, or any other possible ways.
* How to run tests
    * This site should be able to be served even with simple HTTP server. (e.g. http-server)
* Deployment instructions
    * [Architecture Overview](https://angular.io/docs/ts/latest/guide/architecture.html) may help understanding the Angular code.
        ![Architecture](https://angular.io/resources/images/devguide/architecture/overview2.png)
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
### Handwritten description of the overview page's architecture
![overview_architecture.jpg](https://bitbucket.org/repo/RBe5Bj/images/1620926483-overview_architecture.jpg)

### CCTV implementation tips ###
For the purpose of test, we have used Synology Surveillance Station as a solution for CCTV management and streaming service. Streaming is utilised through the Web API of the system.

Given the IP address, correct port number, camera ID, and session ID, using this URL gets the video streaming by GET method:

    http://{{IP address of the NAS}}:{{set port number which is 5000 by default}}/webapi/SurveillanceStation/videoStreaming.cgi?api=SYNO.SurveillanceStation.VideoStream&version=1&method=Stream&cameraId={{camera ID managed by Surveillance Station}}&format=hls&_sid={{session ID}}

And here's the audio streaming address. 

    http://{{IP address of the NAS}}:{{set port number which is 5000 by default}}/webapi/SurveillanceStation/audioStreaming.cgi?api=SYNO.SurveillanceStation.AudioStream&version=2&method=Stream&cameraId={{camera ID managed by Surveillance Station}}&_sid={{session ID}}

Since the video stream does not contain the audio, both video and audio streaming should be implemented in wherever they are to be played at the same time.

The video and audio stream is embedded into CCTV component of current build by <video> and <audio> tags.
```
<div class="col-md-9 m-t">
    <video src="http://112.165.189.69:5000/webapi/SurveillanceStation/videoStreaming.cgi?api=SYNO.SurveillanceStation.VideoStream&version=1&method=Stream&cameraId=2&format=hls&_sid=jGf9F7.Sdq1UU1640O1N421701" autoplay class="w-full"></video>
    <audio src="http://112.165.189.69:5000/webapi/SurveillanceStation/audioStreaming.cgi?api=SYNO.SurveillanceStation.AudioStream&version=2&method=Stream&cameraId=2&_sid=jGf9F7.Sdq1UU1640O1N421701" type="audio/mpeg" autoplay hidden></audio>
</div>
<div class="col-md-3">
    <div class="w-full" style="text-align: center;">
        <span class="icon icon-triangle-up"></span>
    </div>
    <!-- Notice that three embeddings below are images. They get the video stream with MJPEG format. -->
    <img src="http://112.165.189.69:5000/webapi/entry.cgi?api=SYNO.SurveillanceStation.VideoStreaming&version=1&method=Stream&format=mjpeg&cameraId=2&_sid=jGf9F7.Sdq1UU1640O1N421701" class="w-full" />
    <img src="http://112.165.189.69:5000/webapi/entry.cgi?api=SYNO.SurveillanceStation.VideoStreaming&version=1&method=Stream&format=mjpeg&cameraId=2&_sid=jGf9F7.Sdq1UU1640O1N421701" class="w-full m-t" />
    <img src="http://112.165.189.69:5000/webapi/entry.cgi?api=SYNO.SurveillanceStation.VideoStreaming&version=1&method=Stream&format=mjpeg&cameraId=2&_sid=jGf9F7.Sdq1UU1640O1N421701" class="w-full m-t" />
    <div class="w-full" style="text-align: center;">
        <span class="icon icon-triangle-down"></span>
    </div>
</div>
```

Before use get the video or the audio, it should be confirmed that the stream is open. The audio stream seems always open by default, but that for the video is not. The video stream is closed when there are no client getting the stream for some time. To open the stream, use this URL at any client with or without SID:

    http://{{IP address of the NAS}}:{{set port number which is 5000 by default}}/webapi/SurveillanceStation/videoStreaming.cgi?&api=SYNO.SurveillanceStation.VideoStream&version=1&method=Open&cameraId={{camera ID managed by Surveillance Station}}&format=hls



#### Session ID ####

Session ID(SID) is essential to use API without runtime authentication. SID is sent in the body of response against the authentication query through the Web API. The URL for such authentication looks like:

    http://{{IP address of the NAS}}:{{set port number which is 5000 by default}}/webapi/auth.cgi?api=SYNO.API.Auth&version=6&method=Login&account={{account name}}&passwd={{password}}&session=SurveillanceStation

Once a SID is issued, it can be used by any client until it is expired in case - it is not clear whether generated SID is expired at some time or not.

#### Surveillance Web API document ####
For detail information about the API, refer to the official document stored in [here](https://global.download.synology.com/download/Document/DeveloperGuide/).

### Contribution guidelines ###
(to be done maybe)

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact