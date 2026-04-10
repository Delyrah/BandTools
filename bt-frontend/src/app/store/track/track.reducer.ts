import { createFeature, createReducer, on } from '@ngrx/store';
import { trackAdapter, initialTrackState } from './track.state';
import { TrackActions } from './track.actions';

export const trackFeature = createFeature({
    name: 'tracks',
    reducer: createReducer(
        initialTrackState,

        on(TrackActions.loadTracksByBand, state => ({
            ...state, loading: true, error: null
        })),
        on(TrackActions.loadTracksByBandSuccess, (state, { tracks }) =>
            trackAdapter.setAll(tracks, { ...state, loading: false })
        ),
        on(TrackActions.loadTracksByBandFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(TrackActions.loadTrack, state => ({
            ...state, loading: true, error: null
        })),
        on(TrackActions.loadTrackSuccess, (state, { track }) =>
            trackAdapter.upsertOne(track, { ...state, loading: false })
        ),
        on(TrackActions.loadTrackFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(TrackActions.createTrack, state => ({
            ...state, saving: true, error: null
        })),
        on(TrackActions.createTrackSuccess, (state, { track }) =>
            trackAdapter.addOne(track, { ...state, saving: false })
        ),
        on(TrackActions.createTrackFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(TrackActions.updateTrack, state => ({
            ...state, saving: true, error: null
        })),
        on(TrackActions.updateTrackSuccess, (state, { track }) =>
            trackAdapter.upsertOne(track, { ...state, saving: false })
        ),
        on(TrackActions.updateTrackFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(TrackActions.deleteTrack, state => ({
            ...state, saving: true, error: null
        })),
        on(TrackActions.deleteTrackSuccess, (state, { id }) =>
            trackAdapter.removeOne(id, { ...state, saving: false })
        ),
        on(TrackActions.deleteTrackFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(TrackActions.selectTrack, (state, { id }) => ({
            ...state, selectedTrackId: id
        })),
        on(TrackActions.clearTrackError, state => ({
            ...state, error: null
        }))
    )
});