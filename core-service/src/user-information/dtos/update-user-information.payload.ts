export class UpdateUserInformationPayload
  implements IUpdateUserInformationPayload {
  paymentInformation: string;
  documentNumber: string;
  vehicles: string[];
  parkings: string[];
  telephoneNumber: string;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
}
