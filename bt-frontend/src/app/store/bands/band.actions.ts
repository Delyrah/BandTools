import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Band } from '../../core/models/band.model';
import { CreateBandDto, UpdateBandDto } from '../../core/services/band.service';

export const BandActions = createActionGroup({
    source: 'Band',
    events: {
        // Load all
        'Load Bands': emptyProps(),
        'Load Bands Success': props<{ bands: Band[] }>(),
        'Load Bands Failure': props<{ error: string }>(),

        // Load one
        'Load Band': props<{ id: number }>(),
        'Load Band Success': props<{ band: Band }>(),
        'Load Band Failure': props<{ error: string }>(),

        // Create
        'Create Band': props<{ dto: CreateBandDto }>(),
        'Create Band Success': props<{ band: Band }>(),
        'Create Band Failure': props<{ error: string }>(),

        // Update
        'Update Band': props<{ id: number; dto: UpdateBandDto }>(),
        'Update Band Success': props<{ band: Band }>(),
        'Update Band Failure': props<{ error: string }>(),

        // Delete
        'Delete Band': props<{ id: number }>(),
        'Delete Band Success': props<{ id: number }>(),
        'Delete Band Failure': props<{ error: string }>(),

        // UI
        'Select Band': props<{ id: number | null }>(),
        'Clear Band Error': emptyProps()
    }
});