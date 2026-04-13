import { createFeature, createReducer, on } from "@ngrx/store";
import { initialNotificationState } from "./notification.state";
import { NotificationActions } from "./notification.actions";

export const notificationFeature = createFeature({
    name: 'notification',
    reducer: createReducer(
        initialNotificationState,
        on(NotificationActions.add, (state, { notification }) => ({
            ...state,
            notifications: [
                ...state.notifications,
                { 
                    ... notification,
                    id: notification.id || crypto.randomUUID()
                }
            ]
        })),

        on(NotificationActions.dismiss, (state, { id }) => ({
            ...state,
            notifications: state.notifications.filter(i => i.id !== id)
        })),

        on(NotificationActions.clearAll, state => ({
            ...state,
            notifications: []
        }))
    )
});