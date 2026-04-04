import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { BandActions } from './band.actions';
import { BandService } from '../../core/services/band.service';

@Injectable()
export class BandEffects {
    private actions$ = inject(Actions);
    private bandService = inject(BandService);
    private router = inject(Router);

    loadBands$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.loadBands),
            // switchMap cancels any previous in-flight request
            // if loadBands is dispatched again before the first completes
            switchMap(() =>
                this.bandService.getAll().pipe(
                    map(bands => BandActions.loadBandsSuccess({ bands })),
                    catchError(error => of(BandActions.loadBandsFailure({
                        error: error.message ?? 'Failed to load bands'
                    })))
                )
            )
        )
    );

    loadBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.loadBand),
            switchMap(({ id }) =>
                this.bandService.getById(id).pipe(
                    map(band => BandActions.loadBandSuccess({ band })),
                    catchError(error => of(BandActions.loadBandFailure({
                        error: error.message ?? 'Failed to load band'
                    })))
                )
            )
        )
    );

    createBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.createBand),
            // exhaustMap ignores new dispatches while one is in flight
            // prevents double-submitting a form
            exhaustMap(({ dto }) =>
                this.bandService.create(dto).pipe(
                    map(band => BandActions.createBandSuccess({ band })),
                    catchError(error => of(BandActions.createBandFailure({
                        error: error.message ?? 'Failed to create band'
                    })))
                )
            )
        )
    );

    // Navigate to the new band after creation
    createBandSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.createBandSuccess),
            tap(({ band }) => this.router.navigate(['/bands', band.id]))
        ),
        { dispatch: false }  // this effect doesn't dispatch another action
    );

    updateBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.updateBand),
            exhaustMap(({ id, dto }) =>
                this.bandService.update(id, dto).pipe(
                    map(band => BandActions.updateBandSuccess({ band })),
                    catchError(error => of(BandActions.updateBandFailure({
                        error: error.message ?? 'Failed to update band'
                    })))
                )
            )
        )
    );

    deleteBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.deleteBand),
            exhaustMap(({ id }) =>
                this.bandService.delete(id).pipe(
                    map(() => BandActions.deleteBandSuccess({ id })),
                    catchError(error => of(BandActions.deleteBandFailure({
                        error: error.message ?? 'Failed to delete band'
                    })))
                )
            )
        )
    );

    // Navigate back to list after deletion
    deleteBandSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BandActions.deleteBandSuccess),
            tap(() => this.router.navigate(['/bands']))
        ),
        { dispatch: false }
    );
}