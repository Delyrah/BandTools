export interface Gear {
    id: number;
    bandId: number;
    name: string;
    type?: string;
    brand?: string;
    model?: string;
    serialNumber?: string;
    value?: number;
    photoUrl?: string;
    notes?: string;
    ownerId?: number;
    weight?: number;
    weightUnit?: string;
    dimensions?: string;
    dimensionsUnit?: string;
}

interface BaseGearDto extends Omit<Gear, 'id'> { }
export interface CreateGearDto extends BaseGearDto { }
export interface UpdateGearDto extends Partial<BaseGearDto> { }