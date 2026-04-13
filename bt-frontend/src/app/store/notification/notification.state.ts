export type Notificationtype = 'success' | 'error' | 'info';

export interface Notification {
    id?: string;
    message: string;
    type: Notificationtype;
}

export interface NotificationState {
    notifications: Notification[];
    duration: number;
}

export const initialNotificationState: NotificationState = {
    notifications: [],
    duration: 5
}