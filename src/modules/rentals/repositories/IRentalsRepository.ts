import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create: (rentalData: ICreateRentalDTO) => Promise<Rental>;
  findOpenRentalByUser: (userId: string) => Promise<Rental>;
  findOpenRentalByCar: (carId: string) => Promise<Rental>;
  findById: (rentalId: string) => Promise<Rental>;
  findByUser: (userId: string) => Promise<Rental[]>;
}

export { IRentalsRepository };
