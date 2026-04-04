import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Album } from '../../core/models/album.model';

export interface AlbumState extends EntityState<Album> {
    selectedAlbumId: number | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

export const albumAdapter: EntityAdapter<Album> = createEntityAdapter<Album>({
    sortComparer: (a, b) => {
        // Sort by release date descending — newest first
        // Albums without a date go to the bottom
        if (!a.releaseDate && !b.releaseDate) return 0;
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;
        return b.releaseDate.localeCompare(a.releaseDate);
    }
});

export const initialAlbumState: AlbumState = albumAdapter.getInitialState({
    selectedAlbumId: null,
    loading: false,
    saving: false,
    error: null
});