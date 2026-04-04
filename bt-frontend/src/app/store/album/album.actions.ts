import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Album } from '../../core/models/album.model';
import { CreateAlbumDto, UpdateAlbumDto, AddAlbumTrackDto } from '../../core/services/album.service';

export const AlbumActions = createActionGroup({
  source: 'Album',
  events: {
    'Load Albums By Band':          props<{ bandId: number }>(),
    'Load Albums By Band Success':  props<{ albums: Album[] }>(),
    'Load Albums By Band Failure':  props<{ error: string }>(),

    'Load Album':                   props<{ id: number }>(),
    'Load Album Success':           props<{ album: Album }>(),
    'Load Album Failure':           props<{ error: string }>(),

    'Create Album':                 props<{ dto: CreateAlbumDto }>(),
    'Create Album Success':         props<{ album: Album }>(),
    'Create Album Failure':         props<{ error: string }>(),

    'Update Album':                 props<{ id: number; dto: UpdateAlbumDto }>(),
    'Update Album Success':         props<{ album: Album }>(),
    'Update Album Failure':         props<{ error: string }>(),

    'Delete Album':                 props<{ id: number }>(),
    'Delete Album Success':         props<{ id: number }>(),
    'Delete Album Failure':         props<{ error: string }>(),

    'Add Track To Album':           props<{ albumId: number; dto: AddAlbumTrackDto }>(),
    'Add Track To Album Success':   props<{ album: Album }>(),
    'Add Track To Album Failure':   props<{ error: string }>(),

    'Remove Track From Album':          props<{ albumId: number; trackId: number }>(),
    'Remove Track From Album Success':  props<{ album: Album }>(),
    'Remove Track From Album Failure':  props<{ error: string }>(),

    'Select Album':                 props<{ id: number | null }>(),
    'Clear Album Error':            emptyProps()
  }
});