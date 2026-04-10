import { BandState } from './band/band.state';
import { TrackState } from './track/track.state';
import { AlbumState } from './album/album.state';
import { SetlistState } from './setlist/setlist.state';

export interface AppState {
    bands: BandState;
    tracks: TrackState;
    albums: AlbumState;
    setlists: SetlistState;
}