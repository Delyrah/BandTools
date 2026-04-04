import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';
import { CreateTrackDto, UpdateTrackDto } from '../../core/services/track.service';

export const TrackActions = createActionGroup({
    source: 'Track',
    events: {
        'Load Tracks By Band': props<{ bandId: number }>(),
        'Load Tracks By Band Success': props<{ tracks: Track[] }>(),
        'Load Tracks By Band Failure': props<{ error: string }>(),

        'Load Track': props<{ id: number }>(),
        'Load Track Success': props<{ track: Track }>(),
        'Load Track Failure': props<{ error: string }>(),

        'Create Track': props<{ dto: CreateTrackDto }>(),
        'Create Track Success': props<{ track: Track }>(),
        'Create Track Failure': props<{ error: string }>(),

        'Update Track': props<{ id: number; dto: UpdateTrackDto }>(),
        'Update Track Success': props<{ track: Track }>(),
        'Update Track Failure': props<{ error: string }>(),

        'Delete Track': props<{ id: number }>(),
        'Delete Track Success': props<{ id: number }>(),
        'Delete Track Failure': props<{ error: string }>(),

        'Select Track': props<{ id: number | null }>(),
        'Clear Track Error': emptyProps()
    }
});