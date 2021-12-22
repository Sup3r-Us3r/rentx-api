import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(rentalData: ICreateRentalDTO) {
    const rental = this.repository.create({
      id: rentalData.id,
      user_id: rentalData.userId,
      car_id: rentalData.carId,
      expected_return_date: rentalData.expectedReturnDate,
      total: rentalData.total,
      end_date: rentalData.endDate,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByUser(userId: string) {
    const openByUser = await this.repository.findOne({
      where: { user_id: userId, end_date: null },
    });

    return openByUser;
  }

  async findOpenRentalByCar(carId: string) {
    const openByCar = await this.repository.findOne({
      where: { car_id: carId, end_date: null },
    });

    return openByCar;
  }

  async findById(rentalId: string) {
    const rental = await this.repository.findOne({ id: rentalId });

    return rental;
  }

  async findByUser(userId: string) {
    const rental = await this.repository.find({
      where: { user_id: userId },
      relations: ['car'],
    });

    return rental;
  }
}

export { RentalsRepository };
