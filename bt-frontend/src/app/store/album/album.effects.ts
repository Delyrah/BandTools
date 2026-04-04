import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AlbumActions } from './album.actions';
import { AlbumService } from '../../core/services/album.service';

@Injectable()
export class AlbumEffects {
    private actions$ = inject(Actions);
    private albumService = inject(AlbumService);
    private router = inject(Router);

    loadAlbumsByBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.loadAlbumsByBand),
            switchMap(({ bandId }) =>
                this.albumService.getByBand(bandId).pipe(
                    map(albums => AlbumActions.loadAlbumsByBandSuccess({ albums })),
                    catchError(error => of(AlbumActions.loadAlbumsByBandFailure({
                        error: error.message ?? 'Failed to load albums'
                    })))
                )
            )
        )
    );

    loadAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.loadAlbum),
            switchMap(({ id }) =>
                this.albumService.getById(id).pipe(
                    map(album => AlbumActions.loadAlbumSuccess({ album })),
                    catchError(error => of(AlbumActions.loadAlbumFailure({
                        error: error.message ?? 'Failed to load album'
                    })))
                )
            )
        )
    );

    createAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.createAlbum),
            exhaustMap(({ dto }) =>
                this.albumService.create(dto).pipe(
                    map(album => AlbumActions.createAlbumSuccess({ album })),
                    catchError(error => of(AlbumActions.createAlbumFailure({
                        error: error.message ?? 'Failed to create album'
                    })))
                )
            )
        )
    );

    createAlbumSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.createAlbumSuccess),
            tap(({ album }) => this.router.navigate(['/bands', album.bandId, 'albums', album.id]))
        ),
        { dispatch: false }
    );

    updateAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.updateAlbum),
            exhaustMap(({ id, dto }) =>
                this.albumService.update(id, dto).pipe(
                    map(album => AlbumActions.updateAlbumSuccess({ album })),
                    catchError(error => of(AlbumActions.updateAlbumFailure({
                        error: error.message ?? 'Failed to update album'
                    })))
                )
            )
        )
    );

    deleteAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.deleteAlbum),
            exhaustMap(({ id }) =>
                this.albumService.delete(id).pipe(
                    map(() => AlbumActions.deleteAlbumSuccess({ id })),
                    catchError(error => of(AlbumActions.deleteAlbumFailure({
                        error: error.message ?? 'Failed to delete album'
                    })))
                )
            )
        )
    );

    addTrackToAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.addTrackToAlbum),
            exhaustMap(({ albumId, dto }) =>
                this.albumService.addTrack(albumId, dto).pipe(
                    map(album => AlbumActions.addTrackToAlbumSuccess({ album })),
                    catchError(error => of(AlbumActions.addTrackToAlbumFailure({
                        error: error.message ?? 'Failed to add track'
                    })))
                )
            )
        )
    );

    removeTrackFromAlbum$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlbumActions.removeTrackFromAlbum),
            exhaustMap(({ albumId, trackId }) =>
                this.albumService.removeTrack(albumId, trackId).pipe(
                    map(album => AlbumActions.removeTrackFromAlbumSuccess({ album })),
                    catchError(error => of(AlbumActions.removeTrackFromAlbumFailure({
                        error: error.message ?? 'Failed to remove track'
                    })))
                )
            )
        )
    );
}