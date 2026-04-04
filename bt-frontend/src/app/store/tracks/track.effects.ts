import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { TrackActions } from './track.actions';
import { TrackService } from '../../core/services/track.service';

@Injectable()
export class TrackEffects {
    private actions$ = inject(Actions);
    private trackService = inject(TrackService);
    private router = inject(Router);

    loadTracksByBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.loadTracksByBand),
            switchMap(({ bandId }) =>
                this.trackService.getByBand(bandId).pipe(
                    map(tracks => TrackActions.loadTracksByBandSuccess({ tracks })),
                    catchError(error => of(TrackActions.loadTracksByBandFailure({
                        error: error.message ?? 'Failed to load tracks'
                    })))
                )
            )
        )
    );

    loadTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.loadTrack),
            switchMap(({ id }) =>
                this.trackService.getById(id).pipe(
                    map(track => TrackActions.loadTrackSuccess({ track })),
                    catchError(error => of(TrackActions.loadTrackFailure({
                        error: error.message ?? 'Failed to load track'
                    })))
                )
            )
        )
    );

    createTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.createTrack),
            exhaustMap(({ dto }) =>
                this.trackService.create(dto).pipe(
                    map(track => TrackActions.createTrackSuccess({ track })),
                    catchError(error => of(TrackActions.createTrackFailure({
                        error: error.message ?? 'Failed to create track'
                    })))
                )
            )
        )
    );

    createTrackSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.createTrackSuccess),
            tap(({ track }) => this.router.navigate(['/bands', track.bandId, 'tracks', track.id]))
        ),
        { dispatch: false }
    );

    updateTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.updateTrack),
            exhaustMap(({ id, dto }) =>
                this.trackService.update(id, dto).pipe(
                    map(track => TrackActions.updateTrackSuccess({ track })),
                    catchError(error => of(TrackActions.updateTrackFailure({
                        error: error.message ?? 'Failed to update track'
                    })))
                )
            )
        )
    );

    deleteTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.deleteTrack),
            exhaustMap(({ id }) =>
                this.trackService.delete(id).pipe(
                    map(() => TrackActions.deleteTrackSuccess({ id })),
                    catchError(error => of(TrackActions.deleteTrackFailure({
                        error: error.message ?? 'Failed to delete track'
                    })))
                )
            )
        )
    );
}