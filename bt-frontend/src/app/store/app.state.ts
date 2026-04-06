import { BandState } from './bands/band.state';
import { TrackState } from './tracks/track.state';
import { AlbumState } from './album/album.state';
import { SetlistState } from './setlist/setlist.state';

export interface AppState {
    bands: BandState;
    tracks: TrackState;
    albums: AlbumState;
    setlists: SetlistState;
}