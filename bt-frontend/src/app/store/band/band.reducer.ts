import { createFeature, createReducer, on } from '@ngrx/store';
import { bandAdapter, initialBandState } from './band.state';
import { BandActions } from './band.actions';

export const bandFeature = createFeature({
    name: 'bands',
    reducer: createReducer(
        initialBandState,

        // Load all
        on(BandActions.loadBands, state => ({
            ...state,
            loading: true,
            error: null
        })),
        on(BandActions.loadBandsSuccess, (state, { bands }) =>
            bandAdapter.setAll(bands, { ...state, loading: false })
        ),
        on(BandActions.loadBandsFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error
        })),

        // Load one
        on(BandActions.loadBand, state => ({
            ...state,
            loading: true,
            error: null
        })),
        on(BandActions.loadBandSuccess, (state, { band }) =>
            bandAdapter.upsertOne(band, { ...state, loading: false })
        ),
        on(BandActions.loadBandFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error
        })),

        // Create
        on(BandActions.createBand, state => ({
            ...state,
            saving: true,
            error: null
        })),
        on(BandActions.createBandSuccess, (state, { band }) =>
            bandAdapter.addOne(band, { ...state, saving: false })
        ),
        on(BandActions.createBandFailure, (state, { error }) => ({
            ...state,
            saving: false,
            error
        })),

        // Update
        on(BandActions.updateBand, state => ({
            ...state,
            saving: true,
            error: null
        })),
        on(BandActions.updateBandSuccess, (state, { band }) =>
            bandAdapter.upsertOne(band, { ...state, saving: false })
        ),
        on(BandActions.updateBandFailure, (state, { error }) => ({
            ...state,
            saving: false,
            error
        })),

        // Delete
        on(BandActions.deleteBand, state => ({
            ...state,
            saving: true,
            error: null
        })),
        on(BandActions.deleteBandSuccess, (state, { id }) =>
            bandAdapter.removeOne(id, { ...state, saving: false })
        ),
        on(BandActions.deleteBandFailure, (state, { error }) => ({
            ...state,
            saving: false,
            error
        })),

        // UI
        on(BandActions.selectBand, (state, { id }) => ({
            ...state,
            selectedBandId: id
        })),
        on(BandActions.clearBandError, state => ({
            ...state,
            error: null
        }))
    )
});