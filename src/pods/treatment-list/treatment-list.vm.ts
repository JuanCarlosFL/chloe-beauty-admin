// Viewmodel que usaremos en nuestra aplicación
export interface TreatmentVM {
    TreatmentId: number;
    Name: string;
    Duration: number;
    Price: number;
    Points: number;
}
// Función que crea un tratamiento vacío
export const createEmptyTreatment = {
    TreatmentId: 0,
    Name: '',
    Duration: 0,
    Price: 0,
    Points: 0,
}
