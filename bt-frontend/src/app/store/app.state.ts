import { BandState } from './bands/band.state';
import { TrackState } from './tracks/track.state';
import { AlbumState } from './albums/album.state';
import { SetlistState } from './setlists/setlist.state';

export interface AppState {
    bands: BandState;
    tracks: TrackState;
    albums: AlbumState;
    setlists: SetlistState;
}