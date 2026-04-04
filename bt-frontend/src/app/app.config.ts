import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// ngrx
import { AlbumEffects } from './store/album/album.effects';
import { albumFeature } from './store/album/album.reducer';
import { BandEffects } from './store/bands/band.effects';
import { bandFeature } from './store/bands/band.reducer';
import { SetlistEffects } from './store/setlist/setlist.effects';
import { setlistFeature } from './store/setlist/setlist.reducer';
import { TrackEffects } from './store/tracks/track.effects';
import { trackFeature } from './store/tracks/track.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(
            routes,
            withComponentInputBinding()
        ),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideClientHydration(withEventReplay()),
        provideStore({
            [albumFeature.name]: albumFeature.reducer,
            [bandFeature.name]: bandFeature.reducer,
            [setlistFeature.name]: setlistFeature.reducer,
            [trackFeature.name]: trackFeature.reducer
        }),
        provideEffects([
            AlbumEffects,
            BandEffects,
            SetlistEffects,
            TrackEffects
        ]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};
