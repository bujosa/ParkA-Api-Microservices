import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle-entities/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleByIdDto } from './vehicle-dto/get-vehicle-by-id.dto';
import { UpdateVehicleDto } from './vehicle-dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  public async getVehicleById(
    getVehicleByIdDto: GetVehicleByIdDto,
  ): Promise<Vehicle> {
    return await this.vehicleRepository.findOne(getVehicleByIdDto);
  }

  public async getAllVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const {
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
      verified,
      year,
    } = createVehicleDto;

    const vehicle = this.vehicleRepository.create({
      id: uuid(),
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
      verified,
      year,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.vehicleRepository.save(vehicle);
  }

  // TODO: Implement update logic
  public async updateVehicle(
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const {
      id,
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
      year,
    } = updateVehicleDto;

    const vehicle = await this.getVehicleById({ id });

    vehicle.alias = alias ? alias : vehicle.alias;
    vehicle.colorExterior = colorExterior
      ? colorExterior
      : vehicle.colorExterior;
    vehicle.detail = detail ? detail : vehicle.detail;
    vehicle.licensePlate = licensePlate ? licensePlate : vehicle.licensePlate;
    vehicle.mainPicture = mainPicture ? mainPicture : vehicle.mainPicture;
    vehicle.model = model ? model : vehicle.model;
    vehicle.pictures = pictures ? pictures : vehicle.pictures;
    vehicle.bodyStyle = bodyStyle ? bodyStyle : vehicle.bodyStyle;
    vehicle.year = year ? year : vehicle.year;

    vehicle.updatedAt = new Date().toISOString();

    return await this.vehicleRepository.save(vehicle);
  }
}
