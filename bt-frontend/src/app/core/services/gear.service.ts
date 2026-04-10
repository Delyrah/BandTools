import { Injectable } from "@angular/core";
import { Gear } from "../models/gear.model";
import { EntityService } from "./base.entity.service";

@Injectable({ providedIn: 'root' })
export class GearService extends EntityService<Gear> {
    constructor() {
        super('/api/gear');
    }
}