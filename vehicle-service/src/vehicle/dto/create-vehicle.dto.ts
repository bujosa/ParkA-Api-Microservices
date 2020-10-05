import { CreateVehiclePayload } from './create-vehicle.payload';
import { UserInformationPayload } from './user-information.payload';

export class CreateVehicleDto implements ICreateVehicleDto {
  userInformationIdPayload: UserInformationPayload;
  createVehiclePayload: CreateVehiclePayload;
}
