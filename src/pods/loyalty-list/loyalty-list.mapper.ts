import * as viewModel from './loaylty-list.vm';
import * as apiModel from './api/loyalty-list.api.model';
import { mapToCollection } from 'common/mappers';

export const mapLoyaltyFromApiToVm = (
    loyalty: apiModel.Loyalty
): viewModel.LoyaltyVM => {
    return {
        LoyaltyId: loyalty.LoyaltyId,
        TreatmentId: loyalty.TreatmentId,
        TreatmentName: loyalty.Treatment.Name,
        Points: loyalty.Points,
    };
};

export const mapLoyaltyListFromApiToVm = (
    loyaltyList: apiModel.Loyalty[]
): viewModel.LoyaltyVM[] =>
    mapToCollection(loyaltyList, l=> mapLoyaltyFromApiToVm(l));