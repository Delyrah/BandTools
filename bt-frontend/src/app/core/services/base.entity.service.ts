import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class EntityService<T, I = number> {
    protected http = inject(HttpClient);

    constructor(private apiPath: string) {

    }

    getAll() {
        return this.http.get<T[]>(this.apiPath);
    }

    getById(id: I) {
        return this.http.get<T>(`${this.apiPath}/${id}`);
    }

    create(dto: Omit<T, 'id'>) {
        return this.http.post<T>(this.apiPath, dto);
    }

    update(id: I, dto: Partial<T>) {
        return this.http.put<T>(`${this.apiPath}/${id}`, dto);
    }

    delete(id: I) {
        return this.http.delete<void>(`${this.apiPath}/${id}`);
    }
}