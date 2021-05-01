// Modelo que recibimos de la api
export interface Treatment {
    TreatmentId: number;
    Name: string;
    Duration: number;
    Price: number;
    Points: number;
    Deleted: boolean;
    ModifiedDate: string;
}