import * as viewModel from './loaylty-list.vm';
import * as apiModel from './api/loyalty-list.api.model';
import { mapToCollection } from 'common/mappers';
// Función que recibie una oferta de la api y lo mapea al cliente del viewmodel
export const mapLoyaltyFromApiToVm = (loyalty: apiModel.Loyalty): viewModel.LoyaltyVM => {
    return {
        LoyaltyId: loyalty.LoyaltyId,
        TreatmentId: loyalty.TreatmentId,
        TreatmentName: loyalty.Treatment.Name,
        Points: loyalty.Points,
    };
};
// Función que recibe una lista de ofertas y lo mapea al viewmodel
export const mapLoyaltyListFromApiToVm = (loyaltyList: apiModel.Loyalty[]): viewModel.LoyaltyVM[] =>
    mapToCollection(loyaltyList, l=> mapLoyaltyFromApiToVm(l));