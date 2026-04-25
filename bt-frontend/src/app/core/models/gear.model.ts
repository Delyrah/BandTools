export interface Gear {
    id: number;
    bandId: number;
    ownerId?: number;
    name: string;

    type?: string;
    brand?: string;
    model?: string;
    serialNumber?: string;

    photoUrl?: string;
    
    notes?: string;

    value?: number;
    valueCurrency?: string;
    weight?: number;
    weightUnit?: string;
    dimensions?: string;
}

interface BaseGearDto extends Omit<Gear, 'id'> { }
export interface CreateGearDto extends BaseGearDto { }
export interface UpdateGearDto extends Partial<BaseGearDto> { }