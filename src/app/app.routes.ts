import { Route } from '@angular/router';
import { AdminLayoutComponent } from '@layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { Page403Component } from './modules/sessions/page403/page403.component';
import { Page404Component } from './modules/sessions/page404/page404.component';
import { Page500Component } from './modules/sessions/page500/page500.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
      },
      {
        path: 'utilities',
        loadChildren: () =>
          import('./modules/utilities/utilities.routes').then((m) => m.UTILITIES_ROUTE),
      },
      {
        path: '403',
        component: Page403Component,
      },
      {
        path: '404',
        component: Page404Component,
      },
      {
        path: '500',
        component: Page500Component,
      },
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/sessions/sessions.routes').then((m) => m.SESSION_ROUTE),
  },
  { path: '**', redirectTo: '404' },
];
export const APP_ROUTES = [...APP_ROUTE];
export const DASHBOARD_ROUTE = APP_ROUTE.find(
  (route) => route.path === '' && route.component === AdminLayoutComponent
);
export const AUTH_ROUTE = APP_ROUTE.find(
  (route) => route.path === 'auth' && route.component === AuthLayoutComponent
);
export const SESSIONS_ROUTE = APP_ROUTE.find(
  (route) => route.path === 'auth' && route.component === AuthLayoutComponent
);
export const ADMIN_LAYOUT_ROUTE = APP_ROUTE.find(
  (route) => route.component === AdminLayoutComponent
);
export const AUTH_LAYOUT_ROUTE = APP_ROUTE.find(
  (route) => route.component === AuthLayoutComponent
);
export const PAGE_403_ROUTE = APP_ROUTE.find(
  (route) => route.path === '403' && route.component === Page403Component
);
export const PAGE_404_ROUTE = APP_ROUTE.find(
  (route) => route.path === '404' && route.component === Page404Component
);
export const PAGE_500_ROUTE = APP_ROUTE.find(
  (route) => route.path === '500' && route.component === Page500Component
);
export const ADMIN_ROUTES = APP_ROUTE.filter(
  (route) => route.component === AdminLayoutComponent
);
export const AUTH_ROUTES = APP_ROUTE.filter(
  (route) => route.component === AuthLayoutComponent
);
export const SESSIONS_ROUTES = APP_ROUTE.filter(
  (route) => route.component === AuthLayoutComponent
);
export const PUBLIC_ROUTES = APP_ROUTE.filter(
  (route) => route.path === 'auth' || route.path === '403' || route.path === '404' || route.path === '500'
);          