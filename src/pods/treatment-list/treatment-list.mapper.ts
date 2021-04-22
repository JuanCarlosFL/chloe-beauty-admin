import * as viewModel from './treatment-list.vm';
import * as apiModel from './api/treatment.list.api.model';
import { mapToCollection } from 'common/mappers';

export const mapTreatmentFromApiToVm = (
  treatment: apiModel.Treatment
): viewModel.TreatmentVM => {
  return {
    TreatmentId: treatment.TreatmentId,
    Name: treatment.Name,
    Duration: treatment.Duration,
    Price: treatment.Price,
    Points: treatment.Points,
  };
};

export const mapTreatmentListFromApiToVm = (
  treatmentList: apiModel.Treatment[]
): viewModel.TreatmentVM[] =>
  mapToCollection(treatmentList, t => mapTreatmentFromApiToVm(t));
