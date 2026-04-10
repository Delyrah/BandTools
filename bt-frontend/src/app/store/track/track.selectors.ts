import { createSelector } from '@ngrx/store';
import { trackFeature } from './track.reducer';
import { trackAdapter } from './track.state';

export const {
    selectTracksState,
    selectLoading,
    selectSaving,
    selectError,
    selectSelectedTrackId
} = trackFeature;

export const {
    selectAll: selectAllTracks,
    selectEntities: selectTrackEntities,
    selectTotal: selectTotalTracks
} = trackAdapter.getSelectors(selectTracksState);

export const selectSelectedTrack = createSelector(
    selectTrackEntities,
    selectSelectedTrackId,
    (entities, id) => id ? entities[id] ?? null : null
);

export const selectTrackById = (id: number) => createSelector(
    selectTrackEntities,
    entities => entities[id] ?? null
);

export const selectTracksByBand = (bandId: number) => createSelector(
    selectAllTracks,
    tracks => tracks.filter(t => t.bandId === bandId)
);

export const selectTracksByStatus = (status: string) => createSelector(
    selectAllTracks,
    tracks => tracks.filter(t => t.status === status)
);