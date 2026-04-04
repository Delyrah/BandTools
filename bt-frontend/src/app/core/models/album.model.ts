export interface Album {
  id: number;
  bandId: number;
  title: string;
  releaseDate?: string;
  coverImageUrl?: string;
  type: AlbumType;
  description?: string;
  tracks: AlbumTrack[];
}

export type AlbumType = 'Single' | 'EP' | 'LP' | 'Live' | 'Compilation';

export interface AlbumTrack {
  trackId: number;
  title: string;
  trackNumber: number;
  discNumber?: number;
  durationSeconds?: number;
}

