import { createFeature, createReducer, on } from '@ngrx/store';
import { albumAdapter, initialAlbumState } from './album.state';
import { AlbumActions } from './album.actions';

export const albumFeature = createFeature({
    name: 'albums',
    reducer: createReducer(
        initialAlbumState,

        on(AlbumActions.loadAlbumsByBand, state => ({
            ...state, loading: true, error: null
        })),
        on(AlbumActions.loadAlbumsByBandSuccess, (state, { albums }) =>
            albumAdapter.setAll(albums, { ...state, loading: false })
        ),
        on(AlbumActions.loadAlbumsByBandFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(AlbumActions.loadAlbum, state => ({
            ...state, loading: true, error: null
        })),
        on(AlbumActions.loadAlbumSuccess, (state, { album }) =>
            albumAdapter.upsertOne(album, { ...state, loading: false })
        ),
        on(AlbumActions.loadAlbumFailure, (state, { error }) => ({
            ...state, loading: false, error
        })),

        on(AlbumActions.createAlbum, state => ({
            ...state, saving: true, error: null
        })),
        on(AlbumActions.createAlbumSuccess, (state, { album }) =>
            albumAdapter.addOne(album, { ...state, saving: false })
        ),
        on(AlbumActions.createAlbumFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(AlbumActions.updateAlbum, state => ({
            ...state, saving: true, error: null
        })),
        on(AlbumActions.updateAlbumSuccess, (state, { album }) =>
            albumAdapter.upsertOne(album, { ...state, saving: false })
        ),
        on(AlbumActions.updateAlbumFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(AlbumActions.deleteAlbum, state => ({
            ...state, saving: true, error: null
        })),
        on(AlbumActions.deleteAlbumSuccess, (state, { id }) =>
            albumAdapter.removeOne(id, { ...state, saving: false })
        ),
        on(AlbumActions.deleteAlbumFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        // Add/remove track both return the full updated album
        // so we upsert to replace the existing entry with fresh data
        on(AlbumActions.addTrackToAlbum, state => ({
            ...state, saving: true, error: null
        })),
        on(AlbumActions.addTrackToAlbumSuccess, (state, { album }) =>
            albumAdapter.upsertOne(album, { ...state, saving: false })
        ),
        on(AlbumActions.addTrackToAlbumFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(AlbumActions.removeTrackFromAlbum, state => ({
            ...state, saving: true, error: null
        })),
        on(AlbumActions.removeTrackFromAlbumSuccess, (state, { album }) =>
            albumAdapter.upsertOne(album, { ...state, saving: false })
        ),
        on(AlbumActions.removeTrackFromAlbumFailure, (state, { error }) => ({
            ...state, saving: false, error
        })),

        on(AlbumActions.selectAlbum, (state, { id }) => ({
            ...state, selectedAlbumId: id
        })),
        on(AlbumActions.clearAlbumError, state => ({
            ...state, error: null
        }))
    )
});