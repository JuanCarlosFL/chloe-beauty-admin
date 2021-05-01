// Viewmodel que usaremos en nuestra aplicación
export interface LoyaltyVM {
    LoyaltyId: number;
    TreatmentId: number;
    TreatmentName: string;
    Points: number;
}
// Función que crea una oferta vacía
export const createEmptyLoyalty = {
    LoyaltyId: 0,
    TreatmentId: 0,
    TreatmentName: '',
    Points: 0,
};
