"use strict";
var router_1 = require('@angular/router');
var overview_component_1 = require('./overview.component');
var routes = [
    {
        path: '',
        redirectTo: 'overview',
        terminal: true
    },
    {
        path: 'overview',
        component: overview_component_1.OverviewComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map