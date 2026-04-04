import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Setlist } from '../../core/models/setlist.model';
import {
    CreateSetlistDto,
    UpdateSetlistDto,
    AddSetlistTrackDto
} from '../../core/services/setlist.service';

export const SetlistActions = createActionGroup({
    source: 'Setlist',
    events: {
        'Load Setlists By Band': props<{ bandId: number }>(),
        'Load Setlists By Band Success': props<{ setlists: Setlist[] }>(),
        'Load Setlists By Band Failure': props<{ error: string }>(),

        'Load Setlist': props<{ id: number }>(),
        'Load Setlist Success': props<{ setlist: Setlist }>(),
        'Load Setlist Failure': props<{ error: string }>(),

        'Create Setlist': props<{ dto: CreateSetlistDto }>(),
        'Create Setlist Success': props<{ setlist: Setlist }>(),
        'Create Setlist Failure': props<{ error: string }>(),

        'Update Setlist': props<{ id: number; dto: UpdateSetlistDto }>(),
        'Update Setlist Success': props<{ setlist: Setlist }>(),
        'Update Setlist Failure': props<{ error: string }>(),

        'Delete Setlist': props<{ id: number }>(),
        'Delete Setlist Success': props<{ id: number }>(),
        'Delete Setlist Failure': props<{ error: string }>(),

        'Add Track To Setlist': props<{ setlistId: number; dto: AddSetlistTrackDto }>(),
        'Add Track To Setlist Success': props<{ setlist: Setlist }>(),
        'Add Track To Setlist Failure': props<{ error: string }>(),

        'Remove Track From Setlist': props<{ setlistId: number; trackId: number }>(),
        'Remove Track From Setlist Success': props<{ setlist: Setlist }>(),
        'Remove Track From Setlist Failure': props<{ error: string }>(),

        'Reorder Setlist Tracks': props<{ setlistId: number; dto: AddSetlistTrackDto[] }>(),
        'Reorder Setlist Tracks Success': props<{ setlist: Setlist }>(),
        'Reorder Setlist Tracks Failure': props<{ error: string }>(),

        'Select Setlist': props<{ id: number | null }>(),
        'Clear Setlist Error': emptyProps()
    }
});