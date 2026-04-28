import { inject, Injectable } from "@angular/core";
import { Gear } from "../models/gear.model";
import { EntityService } from "./base.entity.service";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class GearService extends EntityService<Gear> {
  constructor() {
    super('/api/gear');
  }

  getAllForBand(bandId: number) {
    return this.http.get<Gear[]>(`/api/gear/for/${bandId}`);
  }
}