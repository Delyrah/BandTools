import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Band } from '../../core/models/band.model';

export interface BandState extends EntityState<Band> {
    selectedBandId: number | null;
    loading: boolean;
    saving: boolean;    // separate flag for create/update operations
    error: string | null;
}

// The adapter handles all the common collection operations
// sortComparer keeps the collection sorted by name automatically
export const bandAdapter: EntityAdapter<Band> = createEntityAdapter<Band>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialBandState: BandState = bandAdapter.getInitialState({
    selectedBandId: null,
    loading: false,
    saving: false,
    error: null
});