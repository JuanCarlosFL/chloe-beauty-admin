import { createEmptyTreatment, TreatmentVM } from "pods/treatment-list/treatment-list.vm";

export interface LoyaltyVM {
    LoyaltyId: number;
    TreatmentId: number;
    TreatmentName: string;
    Points: number;
}

export const createEmptyLoyalty = {
    LoyaltyId: 0,
    TreatmentId: 0,
    TreatmentName: '',
    Points: 0,
};
