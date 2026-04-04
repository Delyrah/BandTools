import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Track } from '../models/track.model';

export interface CreateTrackDto {
    name: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface UpdateTrackDto {
    name?: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class TrackService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/tracks`;

    getAll() {
        return this.http.get<Track[]>(this.apiUrl);
    }

    getByBand(bandId: number) {
        return this.http.get<Track[]>(`${this.apiUrl}/band/${bandId}`);
    }

    getById(id: number) {
        return this.http.get<Track>(`${this.apiUrl}/${id}`);
    }

    create(dto: CreateTrackDto) {
        return this.http.post<Track>(this.apiUrl, dto);
    }

    update(id: number, dto: UpdateTrackDto) {
        return this.http.put<Track>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}