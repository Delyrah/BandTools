import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

// ngrx
import { AlbumEffects } from './store/album/album.effects';
import { albumFeature } from './store/album/album.reducer';
import { BandEffects } from './store/band/band.effects';
import { bandFeature } from './store/band/band.reducer';
import { SetlistEffects } from './store/setlist/setlist.effects';
import { setlistFeature } from './store/setlist/setlist.reducer';
import { TrackEffects } from './store/track/track.effects';
import { trackFeature } from './store/track/track.reducer';
import { notificationFeature } from './store/notification/notification.reducer';
import { NotificationEffects } from './store/notification/notification.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(
            routes,
            withComponentInputBinding()
        ),
        provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
        provideClientHydration(withEventReplay()),
        
        // ngrx
        provideStore(),
        provideState(albumFeature),
        provideState(bandFeature),
        provideState(notificationFeature),
        provideState(setlistFeature),
        provideState(trackFeature),
        provideEffects([
            AlbumEffects,
            BandEffects,
            NotificationEffects,
            SetlistEffects,
            TrackEffects
        ]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};
