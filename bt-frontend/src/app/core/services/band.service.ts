import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Band } from '../models/band.model';

export interface CreateBandDto {
    name: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

export interface UpdateBandDto {
    name?: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class BandService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/bands`;

    getAll() {
        return this.http.get<Band[]>(this.apiUrl);
    }

    getById(id: number) {
        return this.http.get<Band>(`${this.apiUrl}/${id}`);
    }

    create(dto: CreateBandDto) {
        return this.http.post<Band>(this.apiUrl, dto);
    }

    update(id: number, dto: UpdateBandDto) {
        return this.http.put<Band>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}