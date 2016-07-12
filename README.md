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
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="" />
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

* Dependencies
    * [Angular](https://angular.io)
    * [Bootstrap](http://v4-alpha.getbootstrap.com) (fetched from CDN by <link> and <script> tags)
    * [Bootstrap Dashboard Theme](http://themes.getbootstrap.com/products/dashboard) (should be purchased)
    * [jQuery](http://jquery.com) (fetched from CDN by <script> tag)
    * [Chart.js](http://chartjs.org) (fetched from CDN by <script> tag)
        * Chart.js is required by Bootstrap Dashboard Theme. Originally it implements Chart.js v1, but now the toolkit of the theme is adjusted to work with Chart.js v2. However it is not tested yet.

* Database configuration(?)
    * This dashboard is to use API to retrieve data. This process can be done through XMLHttpRequest with CORS by built-in HTTP client module of Angular, or any other possible ways.
* How to run tests
    * This site should be able to be served even with simple HTTP server. (e.g. http-server)
* Deployment instructions
    * [Architecture Overview](https://angular.io/docs/ts/latest/guide/architecture.html) may help understanding the Angular code.
    * Actual pages are rendered by accordingly executing .js files in /app directory. Each of these is derived from paired .ts files.
    * main.ts is the main file to fetch and order other .ts files.

```
#!typescript
import { bootstrap }    from '@angular/platform-browser-dynamic';
        
import { AppComponent } from './app.component'; //Actually from './app.component.ts'; it is pre-configured with '.ts' as default extension
import { APP_ROUTER_PROVIDERS } from './app.routes'; //Actually from './app.routes'
     
bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS
]);
```
* Deployment instructions (continued)
    * Each page consists of 'components'. 

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact