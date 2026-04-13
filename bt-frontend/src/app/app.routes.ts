import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./features/shell/shell.component')
            .then(m => m.ShellComponent),
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
                path: 'gear',
                loadComponent: () => import('./features/gear/pages/gear-list-page/gear-list-page.component')
                    .then(m => m.GearListPageComponent)
            },
            {
                path: 'gear/:id',
                loadComponent: () => import('./features/gear/pages/gear-detail-page/gear-detail-page.component')
                    .then(m => m.GearDetailPageComponent)
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
        redirectTo: 'login'
    }
];