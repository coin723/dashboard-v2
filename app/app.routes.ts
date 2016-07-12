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