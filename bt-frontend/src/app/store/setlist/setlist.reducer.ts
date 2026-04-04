import { createFeature, createReducer, on } from '@ngrx/store';
import { setlistAdapter, initialSetlistState } from './setlist.state';
import { SetlistActions } from './setlist.actions';

export const setlistFeature = createFeature({
    name: 'setlists',
    reducer: createReducer(
        initialSetlistState,

        on(SetlistActions.loadSetlistsByBand, state => ({
            ...state, loading: true, error: null
        })),
        on(SetlistActions.loadSetlistsByBandSuccess, (state, { setlists }) =>
            setlistAdapter.setAll(setlists, { ...state, loading: false })
        ),
        on(SetlistActions.loadSetlistsByBandFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(SetlistActions.loadSetlist, state => ({
            ...state, loading: true, error: null
        })),
        on(SetlistActions.loadSetlistSuccess, (state, { setlist }) =>
            setlistAdapter.upsertOne(setlist, { ...state, loading: false })
        ),
        on(SetlistActions.loadSetlistFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(SetlistActions.createSetlist, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.createSetlistSuccess, (state, { setlist }) =>
            setlistAdapter.addOne(setlist, { ...state, saving: false })
        ),
        on(SetlistActions.createSetlistFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.updateSetlist, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.updateSetlistSuccess, (state, { setlist }) =>
            setlistAdapter.upsertOne(setlist, { ...state, saving: false })
        ),
        on(SetlistActions.updateSetlistFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.deleteSetlist, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.deleteSetlistSuccess, (state, { id }) =>
            setlistAdapter.removeOne(id, { ...state, saving: false })
        ),
        on(SetlistActions.deleteSetlistFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.addTrackToSetlist, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.addTrackToSetlistSuccess, (state, { setlist }) =>
            setlistAdapter.upsertOne(setlist, { ...state, saving: false })
        ),
        on(SetlistActions.addTrackToSetlistFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.removeTrackFromSetlist, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.removeTrackFromSetlistSuccess, (state, { setlist }) =>
            setlistAdapter.upsertOne(setlist, { ...state, saving: false })
        ),
        on(SetlistActions.removeTrackFromSetlistFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.reorderSetlistTracks, state => ({
            ...state, saving: true, error: null
        })),
        on(SetlistActions.reorderSetlistTracksSuccess, (state, { setlist }) =>
            setlistAdapter.upsertOne(setlist, { ...state, saving: false })
        ),
        on(SetlistActions.reorderSetlistTracksFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(SetlistActions.selectSetlist, (state, { id }) => ({
            ...state, selectedSetlistId: id
        })),
        on(SetlistActions.clearSetlistError, state => ({
            ...state, error: null
        }))
    )
});