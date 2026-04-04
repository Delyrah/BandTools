export interface Track {
    id: number;
    bandId: number;
    title: string;
    durationSeconds?: number;
    bpm?: number;
    key?: string;
    lyrics?: string;
    notes?: string;
    status: TrackStatus;
}

export type TrackStatus = 'Demo' | 'InProgress' | 'Finished' | 'Retired';

