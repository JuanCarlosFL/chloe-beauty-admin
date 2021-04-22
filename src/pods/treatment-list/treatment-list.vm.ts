export interface TreatmentVM {
    TreatmentId: number;
    Name: string;
    Duration: number;
    Price: number;
    Points: number;
}

export const createEmptyTreatment = {
    TreatmentId: 0,
    Name: '',
    Duration: 0,
    Price: 0,
    Points: 0,
}
