import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: '',
        canActivate: [authGuard],   // all children require auth
        children: [
            {
                path: 'bands',
                loadComponent: () => import('./features/bands/pages/band-list-page/band-list-page.component')
                    .then(m => m.BandListPageComponent)
            },
            {
                path: 'bands/:id',
                loadComponent: () => import('./features/bands/pages/band-detail-page/band-detail-page.component')
                    .then(m => m.BandDetailPageComponent)
            },
            {
                path: '',
                redirectTo: 'bands',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'bands'
    }
];