import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GearService } from "../../core/services/gear.service";
import { Router } from "@angular/router";
import { GearActions } from "./gear.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class GearEffects {
    private actions$ = inject(Actions);
    private gearService = inject(GearService);
    private router = inject(Router);

    loadAllGear$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GearActions.loadAllGear),
            switchMap(() => 
                this.gearService.getAll().pipe(
                    map(gear => GearActions.loadAllGearSuccess({ gear })),
                    catchError(error => of(GearActions.loadAllGearFailure({
                        error: error.message ?? 'Failed to load all gear'
                    })))
                )
            )
        )
    )

    loadAllGearForBand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GearActions.loadAllGearForBand),
            switchMap(({ id }) =>
                this.gearService.getAllForBand(id).pipe(
                map(gear => GearActions.loadAllGearForBandSuccess({ gear })),
                catchError(error => of(GearActions.loadAllGearForBandFailure({
                    error: error.message ?? 'Failed to load gear for band'
                })))
                )
            )
        )
    )

    loadGear$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GearActions.loadGear),
            switchMap(({ id }) => 
                this.gearService.getById(id).pipe(
                    map(gear => GearActions.loadGearSuccess({ gear })),
                    catchError(error => of(GearActions.loadGearFailure({
                        error: error.message ?? 'Failed to load bands'
                    })))
                )
            )
        )
    )

    createGear$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GearActions.createGear),
            exhaustMap(({ dto }) => 
                this.gearService.create(dto).pipe(
                    map(gear => GearActions.createGearSuccess({ gear })),
                    catchError(error => of(GearActions.createGearFailure({
                        error: error.message ?? 'Failed to create gear'
                    })))
                )
            )
        )
    );

    creategearSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GearActions.createGearSuccess),
            tap(({ gear }) => this.router.navigate(['/gear', gear.id]))
        ),
        { dispatch: false }
    );


    updateGear$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GearActions.updateGear),
            exhaustMap(({ id, dto }) =>
                this.gearService.update(id, dto).pipe(
                    map(gear => GearActions.updateGearSuccess({ gear })),
                    catchError(error => of(GearActions.updateGearFailure({
                        error: error.message ?? 'Failed to update gear'
                    })))
                )
            )
        )
    );


    deleteGear$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GearActions.deleteGear),
            exhaustMap(({ id }) =>
                this.gearService.delete(id).pipe(
                    map(() => GearActions.deleteGearSuccess({ id })),
                    catchError(error => of(GearActions.deleteGearFailure({
                        error: error.message ?? 'Failed to delete gear'
                    })))
                )
            )
        )
    );

    deleteGearSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GearActions.deleteGearSuccess),
            tap(() => this.router.navigate(['/gear']))
        ),
        { dispatch: false }
    );

}