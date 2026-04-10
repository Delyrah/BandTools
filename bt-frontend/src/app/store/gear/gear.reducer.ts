import { createFeature, createReducer, on } from "@ngrx/store";
import { gearAdapter, initialGearState } from "./gear.state";
import { GearActions } from "./gear.actions";

export const gearReducer = createReducer(
    initialGearState,

    // Load all
    on(GearActions.loadAllGear, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(GearActions.loadAllGearSuccess, (state, { gear }) => 
        gearAdapter.setAll(gear, { 
            ...state, 
            loading: false 
        })
    ),
    on(GearActions.loadAllGearFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load one
    on(GearActions.loadGear, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(GearActions.loadGearSuccess, (state, { gear }) => 
        gearAdapter.upsertOne(gear, { 
            ...state,
            loading: false
        })
    ),
    on(GearActions.loadGearFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create
    on(GearActions.createGear, state => ({
        ...state,
        saving: true,
        error: null
    })),
    on(GearActions.createGearSuccess, (state, { gear }) => 
        gearAdapter.addOne(gear, {
            ...state,
            saving: false
        })
    ),
    on(GearActions.createGearFailure, (state, { error }) => ({
        ...state,
        saving: false,
        error
    })),

    // Update
    on(GearActions.updateGear, state => ({
        ...state,
        saving: true,
        error: null
    })),
    on(GearActions.updateGearSuccess, (state, { gear }) => 
        gearAdapter.upsertOne(gear, {
            ...state,
            saving: false
        })
    ),
    on(GearActions.updateGearFailure, (state, { error }) => ({
        ...state,
        saving: false,
        error
    })),

    // Delete
    on(GearActions.deleteGear, state => ({
        ...state,
        saving: true,
        error: null
    })),
    on(GearActions.deleteGearSuccess, (state, { id }) => 
        gearAdapter.removeOne(id, {
            ...state,
            saving: false
        })
    ),
    on(GearActions.deleteGearFailure, (state, { error }) => ({
        ...state,
        saving: false,
        error
    })),

    // UI
    on(GearActions.selectGear, (state, { id }) => ({
        ...state,
        selectedGearId: id
    })),
    on(GearActions.clearGearError, state => ({
        ...state,
        error: null
    }))
);

export const gearFeature = createFeature({
    name: 'gear',
    reducer: gearReducer
});