import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateGearDto, Gear, UpdateGearDto } from "../../core/models/gear.model";

export const GearActions = createActionGroup({
    source: 'Gear',
    events: {
        // Load all
        'Load all Gear': emptyProps(),
        'Load all Gear Success': props<{ gear: Gear[] }>(),
        'Load all Gear Failure': props<{ error: string }>(),
        
        // Load all
        'Load all Gear for Band': props<{ id: number }>(),
        'Load all Gear for Band Success': props<{ gear: Gear[] }>(),
        'Load all Gear for Band Failure': props<{ error: string }>(),

        // Load one
        'Load Gear': props<{ id: number }>(),
        'Load Gear Success': props<{ gear: Gear }>(),
        'Load Gear Failure': props<{ error: string }>(),

        // Create
        'Create Gear': props<{ dto: CreateGearDto }>(),
        'Create Gear Success': props<{ gear: Gear }>(),
        'Create Gear Failure': props<{ error: string }>(),

        // Update
        'Update Gear': props<{ id: number; dto: UpdateGearDto }>(),
        'Update Gear Success': props<{ gear: Gear }>(),
        'Update Gear Failure': props<{ error: string }>(),

        // Delete
        'Delete Gear': props<{ id: number }>(),
        'Delete Gear Success': props<{ id: number }>(),
        'Delete Gear Failure': props<{ error: string }>(),

        // UI
        'Select Gear': props<{ id: number | null }>(),
        'Clear Gear Error': emptyProps()
    }
});