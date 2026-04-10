import { createSelector } from '@ngrx/store';
import { bandFeature } from './band.reducer';
import { bandAdapter } from './band.state';

// createFeature auto-generates selectors for top-level state properties
export const {
    selectBandsState,
    selectLoading,
    selectSaving,
    selectError,
    selectSelectedBandId
} = bandFeature;

// Entity adapter generates collection selectors
export const {
    selectAll: selectAllBands,
    selectEntities: selectBandEntities,
    selectIds: selectBandIds,
    selectTotal: selectTotalBands
} = bandAdapter.getSelectors(selectBandsState);

// Composed selectors
export const selectSelectedBand = createSelector(
    selectBandEntities,
    selectSelectedBandId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectBandById = (id: number) => createSelector(
    selectBandEntities,
    entities => entities[id] ?? null
);

// Useful for showing empty state
export const selectBandsLoaded = createSelector(
    selectTotalBands,
    selectLoading,
    (total, loading) => !loading && total > 0
);