// Modelo que recibimos de la api
export interface Loyalty {
    "Deleted": boolean,
    "LoyaltyId": number,
    "ModifiedDate": string,
    "Points": number,
    "Treatment": {
      "TreatmentId": number,
      "Name": string,
      "Duration": number,
      "Price": number,
      "Points": number,
      "Deleted": boolean,
      "ModifiedDate": string,
      "Appointments": []
    },
    "TreatmentId": number
  }

