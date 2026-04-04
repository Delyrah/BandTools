import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Setlist } from '../models/setlist.model';

export interface CreateSetlistDto {
    name: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface UpdateSetlistDto {
    name?: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface AddSetlistTrackDto {
    trackId: number;
    position?: number;
}

@Injectable({ providedIn: 'root' })
export class SetlistService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/setlists`;

    getAll() {
        return this.http.get<Setlist[]>(this.apiUrl);
    }

    getById(id: number) {
        return this.http.get<Setlist>(`${this.apiUrl}/${id}`);
    }

    getByBand(bandId: number) {
        return this.http.get<Setlist[]>(`${this.apiUrl}/band/${bandId}`);
    }

    create(dto: CreateSetlistDto) {
        return this.http.post<Setlist>(this.apiUrl, dto);
    }

    update(id: number, dto: UpdateSetlistDto) {
        return this.http.put<Setlist>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    addTrack(setlistId: number, dto: AddSetlistTrackDto) {
        return this.http.post<Setlist>(`${this.apiUrl}/${setlistId}/tracks`, dto);
    }

    removeTrack(setlistId: number, trackId: number) {
        return this.http.delete<Setlist>(`${this.apiUrl}/${setlistId}/tracks/${trackId}`);
    }

    reorderTracks(setlistId: number, dto: AddSetlistTrackDto[]) {
        return this.http.put<Setlist>(`${this.apiUrl}/${setlistId}/tracks/reorder`, dto);
    }
}