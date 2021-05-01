import * as viewModel from './treatment-list.vm';
import * as apiModel from './api/treatment.list.api.model';
import { mapToCollection } from 'common/mappers';
// Función que recibie un tratamiento de la api y lo mapea al cliente del viewmodel
export const mapTreatmentFromApiToVm = (treatment: apiModel.Treatment): viewModel.TreatmentVM => {
  return {
    TreatmentId: treatment.TreatmentId,
    Name: treatment.Name,
    Duration: treatment.Duration,
    Price: treatment.Price,
    Points: treatment.Points,
  };
};
// Función que recibe una lista de tratamientos y lo mapea al viewmodel
export const mapTreatmentListFromApiToVm = (treatmentList: apiModel.Treatment[]): viewModel.TreatmentVM[] =>
  mapToCollection(treatmentList, t => mapTreatmentFromApiToVm(t));
