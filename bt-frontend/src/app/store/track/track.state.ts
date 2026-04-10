import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Track } from '../../core/models/track.model';

export interface TrackState extends EntityState<Track> {
    selectedTrackId: number | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

export const trackAdapter: EntityAdapter<Track> = createEntityAdapter<Track>({
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

export const initialTrackState: TrackState = trackAdapter.getInitialState({
    selectedTrackId: null,
    loading: false,
    saving: false,
    error: null
});