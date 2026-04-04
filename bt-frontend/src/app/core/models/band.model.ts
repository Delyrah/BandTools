import { BandMember } from "./member.model";

export interface Band {
    id: number;
    name: string;
    genre?: string;
    founded?: string;
    bio?: string;
    logoUrl?: string;
    members: BandMember[];
}

