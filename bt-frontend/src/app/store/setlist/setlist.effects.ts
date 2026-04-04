import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { SetlistActions } from './setlist.actions';
import { SetlistService } from '../../core/services/setlist.service';

@Injectable()
export class SetlistEffects {
    private actions$ = inject(Actions);
    private setlistService = inject(SetlistService);
    private router = inject(Router);

    loadSetlistsByBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.loadSetlistsByBand),
            switchMap(({ bandId }) =>
                this.setlistService.getByBand(bandId).pipe(
                    map(setlists => SetlistActions.loadSetlistsByBandSuccess({ setlists })),
                    catchError(error => of(SetlistActions.loadSetlistsByBandFailure({
                        error: error.message ?? 'Failed to load setlists'
                    })))
                )
            )
        )
    );

    loadSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.loadSetlist),
            switchMap(({ id }) =>
                this.setlistService.getById(id).pipe(
                    map(setlist => SetlistActions.loadSetlistSuccess({ setlist })),
                    catchError(error => of(SetlistActions.loadSetlistFailure({
                        error: error.message ?? 'Failed to load setlist'
                    })))
                )
            )
        )
    );

    createSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.createSetlist),
            exhaustMap(({ dto }) =>
                this.setlistService.create(dto).pipe(
                    map(setlist => SetlistActions.createSetlistSuccess({ setlist })),
                    catchError(error => of(SetlistActions.createSetlistFailure({
                        error: error.message ?? 'Failed to create setlist'
                    })))
                )
            )
        )
    );

    createSetlistSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.createSetlistSuccess),
            tap(({ setlist }) =>
                this.router.navigate(['/bands', setlist.bandId, 'setlists', setlist.id]))
        ),
        { dispatch: false }
    );

    updateSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.updateSetlist),
            exhaustMap(({ id, dto }) =>
                this.setlistService.update(id, dto).pipe(
                    map(setlist => SetlistActions.updateSetlistSuccess({ setlist })),
                    catchError(error => of(SetlistActions.updateSetlistFailure({
                        error: error.message ?? 'Failed to update setlist'
                    })))
                )
            )
        )
    );

    deleteSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.deleteSetlist),
            exhaustMap(({ id }) =>
                this.setlistService.delete(id).pipe(
                    map(() => SetlistActions.deleteSetlistSuccess({ id })),
                    catchError(error => of(SetlistActions.deleteSetlistFailure({
                        error: error.message ?? 'Failed to delete setlist'
                    })))
                )
            )
        )
    );

    addTrackToSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.addTrackToSetlist),
            exhaustMap(({ setlistId, dto }) =>
                this.setlistService.addTrack(setlistId, dto).pipe(
                    map(setlist => SetlistActions.addTrackToSetlistSuccess({ setlist })),
                    catchError(error => of(SetlistActions.addTrackToSetlistFailure({
                        error: error.message ?? 'Failed to add track'
                    })))
                )
            )
        )
    );

    removeTrackFromSetlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.removeTrackFromSetlist),
            exhaustMap(({ setlistId, trackId }) =>
                this.setlistService.removeTrack(setlistId, trackId).pipe(
                    map(setlist => SetlistActions.removeTrackFromSetlistSuccess({ setlist })),
                    catchError(error => of(SetlistActions.removeTrackFromSetlistFailure({
                        error: error.message ?? 'Failed to remove track'
                    })))
                )
            )
        )
    );

    reorderSetlistTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetlistActions.reorderSetlistTracks),
            exhaustMap(({ setlistId, dto }) =>
                this.setlistService.reorderTracks(setlistId, dto).pipe(
                    map(setlist => SetlistActions.reorderSetlistTracksSuccess({ setlist })),
                    catchError(error => of(SetlistActions.reorderSetlistTracksFailure({
                        error: error.message ?? 'Failed to reorder tracks'
                    })))
                )
            )
        )
    );
}