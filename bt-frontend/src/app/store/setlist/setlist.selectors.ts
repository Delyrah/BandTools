import { createSelector } from '@ngrx/store';
import { setlistFeature } from './setlist.reducer';
import { setlistAdapter } from './setlist.state';

export const {
    selectSetlistsState,
    selectLoading,
    selectSaving,
    selectError,
    selectSelectedSetlistId
} = setlistFeature;

export const {
    selectAll: selectAllSetlists,
    selectEntities: selectSetlistEntities,
    selectTotal: selectTotalSetlists
} = setlistAdapter.getSelectors(selectSetlistsState);

export const selectSelectedSetlist = createSelector(
    selectSetlistEntities,
    selectSelectedSetlistId,
    (entities, id) => id ? entities[id] ?? null : null
);

export const selectSetlistById = (id: number) => createSelector(
    selectSetlistEntities,
    entities => entities[id] ?? null
);

export const selectSetlistsByBand = (bandId: number) => createSelector(
    selectAllSetlists,
    setlists => setlists.filter(s => s.bandId === bandId)
);

export const selectSetlistsByStatus = (status: string) => createSelector(
    selectAllSetlists,
    setlists => setlists.filter(s => s.status === status)
);

// Useful for the setlist detail page — tracks sorted by position
export const selectSetlistWithSortedTracks = (id: number) => createSelector(
    selectSetlistEntities,
    entities => {
        const setlist = entities[id];
        if (!setlist) return null;
        return {
            ...setlist,
            tracks: [...setlist.tracks].sort((a, b) => a.position - b.position)
        };
    }
);