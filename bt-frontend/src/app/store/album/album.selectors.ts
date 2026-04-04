import { createSelector } from '@ngrx/store';
import { albumFeature } from './album.reducer';
import { albumAdapter } from './album.state';

export const {
    selectAlbumsState,
    selectLoading,
    selectSaving,
    selectError,
    selectSelectedAlbumId
} = albumFeature;

export const {
    selectAll: selectAllAlbums,
    selectEntities: selectAlbumEntities,
    selectTotal: selectTotalAlbums
} = albumAdapter.getSelectors(selectAlbumsState);

export const selectSelectedAlbum = createSelector(
    selectAlbumEntities,
    selectSelectedAlbumId,
    (entities, id) => id ? entities[id] ?? null : null
);

export const selectAlbumById = (id: number) => createSelector(
    selectAlbumEntities,
    entities => entities[id] ?? null
);

export const selectAlbumsByBand = (bandId: number) => createSelector(
    selectAllAlbums,
    albums => albums.filter(a => a.bandId === bandId)
);