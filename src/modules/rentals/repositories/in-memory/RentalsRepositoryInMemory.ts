import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByUser(userId: string) {
    return this.rentals.find(
      (rental) => rental.user_id === userId && !rental.end_date
    );
  }

  async findOpenRentalByCar(carId: string) {
    return this.rentals.find(
      (rental) => rental.car_id === carId && !rental.end_date
    );
  }

  async create(rentalData: ICreateRentalDTO) {
    const rental = new Rental();

    Object.assign(rental, {
      user_id: rentalData.userId,
      car_id: rentalData.carId,
      expected_return_date: rentalData.expectedReturnDate,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(rentalId: string) {
    return this.rentals.find(rental => rental.id === rentalId);
  }

  async findByUser(userId: string) {
    return this.rentals.filter(rental => rental.user_id === userId);
  }
}

export { RentalsRepositoryInMemory };
