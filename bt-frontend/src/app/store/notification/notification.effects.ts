import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, delay, filter, of } from 'rxjs';
import { NotificationActions } from './notification.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class NotificationEffects {
    private actions$ = inject(Actions);

    // Listen to every *Failure action across all features
    showSuccessNotification$ = createEffect(() =>
        this.actions$.pipe(
            filter((action): action is Action & { error: string } =>
                action.type.endsWith('Success')
            ),
            map(({ error }) => NotificationActions.add({
                notification: {
                    message: error,
                    type: 'success'
                }
            }))
        )
    );

    showErrorNotification$ = createEffect(() =>
        this.actions$.pipe(
            filter((action): action is Action & { error: string } =>
                action.type.endsWith('Failure')
            ),
            map(({ error }) => NotificationActions.add({
                notification: {
                    message: error,
                    type: 'error'
                }
            }))
        )
    );

    autoDismiss$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotificationActions.dismiss),
            mergeMap(({ id }) =>
                of(NotificationActions.dismiss({ id })).pipe(delay(5000))
            )
        )
    );
}