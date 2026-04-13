import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Notification } from "./notification.state";

export const NotificationActions = createActionGroup({
    source: 'Notification',
    events: {
        'Add': props<{ notification: Notification }>(),
        'Dismiss': props<{ id: string }>(),
        'Clear all': emptyProps()
    }
});