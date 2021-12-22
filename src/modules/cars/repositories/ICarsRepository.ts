import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAvailableDTO } from '../dtos/IFindAvailableDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create: (carData: ICreateCarDTO) => Promise<Car>;
  findByLicensePlate: (licensePlate: string) => Promise<Car>;
  findAvailable: (searchBy: IFindAvailableDTO) => Promise<Car[]>;
  findById: (carId: string) => Promise<Car>;
  updateAvailable: (carId: string, available: boolean) => Promise<void>;
}

export { ICarsRepository };
