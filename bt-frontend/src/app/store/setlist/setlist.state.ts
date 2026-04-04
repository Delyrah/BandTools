import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Setlist } from '../../core/models/setlist.model';

export interface SetlistState extends EntityState<Setlist> {
    selectedSetlistId: number | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

export const setlistAdapter: EntityAdapter<Setlist> = createEntityAdapter<Setlist>({
    sortComparer: (a, b) => {
        // Sort by show date descending — most recent first
        if (!a.showDate && !b.showDate) return 0;
        if (!a.showDate) return 1;
        if (!b.showDate) return -1;
        return b.showDate.localeCompare(a.showDate);
    }
});

export const initialSetlistState: SetlistState = setlistAdapter.getInitialState({
    selectedSetlistId: null,
    loading: false,
    saving: false,
    error: null
});