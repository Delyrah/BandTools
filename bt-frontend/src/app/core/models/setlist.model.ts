export interface Setlist {
    id: number;
    bandId: number;
    name: string;
    showDate?: string;
    venue?: string;
    notes?: string;
    status: SetlistStatus;
    tracks: SetlistTrack[];
}

export type SetlistStatus = 'Draft' | 'Confirmed' | 'Performed' | 'Cancelled';

export interface SetlistTrack {
    trackId: number;
    title: string;
    position: number;
    notes?: string;
    durationSeconds?: number;
}

