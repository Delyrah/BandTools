export interface Member {
    id: number;
    name: string;
    avatarUrl?: string;
    bio?: string;
    linkedUserId?: number;
}

export interface BandMember {
    memberId: number;
    name: string;
    role?: string;
    avatarUrl?: string;
    joinDate?: string;
    leaveDate?: string;
    isActive: boolean;
}

