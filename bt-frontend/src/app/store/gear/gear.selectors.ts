import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gearFeature } from "./gear.reducer";
import { gearAdapter } from "./gear.state";
import { selectSelectedBandId } from "../band/band.selectors";

export const {
    selectGearState,
    selectLoading,
    selectSaving,
    selectError,
    selectSelectedGearId
} = gearFeature;

export const {
    selectAll: selectAllGear,
    selectEntities: selectGearEntities,
    selectIds: selectGearIds,
    selectTotal: selectTotalGear
} = gearAdapter.getSelectors(selectGearState);

export const selectSelectedGear = createSelector(
    selectGearEntities,
    selectSelectedGearId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectGearById = (id: number) => createSelector(
    selectGearEntities,
    entities => entities[id] ?? null
);

export const selectGearLoaded = createSelector(
    selectTotalGear,
    selectLoading,
    (total, loading) => !loading && total > 0
);

export const selectBandGear = createSelector(
    selectSelectedBandId,
    selectAllGear,
    (bandId, gear) => gear.filter(g => g.bandId === bandId)
)