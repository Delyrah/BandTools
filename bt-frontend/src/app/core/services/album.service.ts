import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Album } from '../models/album.model';

export interface CreateAlbumDto {
    name: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface UpdateAlbumDto {
    name?: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface AddAlbumTrackDto {
    trackId: number;
    position?: number;
}

@Injectable({ providedIn: 'root' })
export class AlbumService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/albums`;

    getAll() {
        return this.http.get<Album[]>(this.apiUrl);
    }

    getById(id: number) {
        return this.http.get<Album>(`${this.apiUrl}/${id}`);
    }

    getByBand(bandId: number) {
        return this.http.get<Album[]>(`${this.apiUrl}/band/${bandId}`);
    }

    create(dto: CreateAlbumDto) {
        return this.http.post<Album>(this.apiUrl, dto);
    }

    update(id: number, dto: UpdateAlbumDto) {
        return this.http.put<Album>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    addTrack(albumId: number, dto: AddAlbumTrackDto) {
        return this.http.post<Album>(`${this.apiUrl}/${albumId}/tracks`, dto);
    }

    removeTrack(albumId: number, trackId: number) {
        return this.http.delete<Album>(`${this.apiUrl}/${albumId}/tracks/${trackId}`);
    }
}