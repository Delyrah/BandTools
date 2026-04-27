import { BandState } from './band/band.state';
import { TrackState } from './track/track.state';
import { AlbumState } from './album/album.state';
import { SetlistState } from './setlist/setlist.state';
import { GearState } from './gear/gear.state';
import { Band } from '../core/models/band.model';
import { createAction, createActionGroup, props } from '@ngrx/store';
import { NotificationState } from './notification/notification.state';

export interface AppState {
    albums: AlbumState;
    bands: BandState;
    currentBand: Band | null;
    gear: GearState;
    notification: NotificationState;
    setlists: SetlistState;
    tracks: TrackState;
}