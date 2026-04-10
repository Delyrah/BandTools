import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Gear } from "../../core/models/gear.model";

export interface GearState extends EntityState<Gear> {
    selectedGearId: number | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

export const gearAdapter: EntityAdapter<Gear> = createEntityAdapter<Gear>({
    selectId: (g: Gear) => g.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialGearState: GearState = gearAdapter.getInitialState({
    selectedGearId: null,
    loading: false,
    saving: false,
    error: null
});