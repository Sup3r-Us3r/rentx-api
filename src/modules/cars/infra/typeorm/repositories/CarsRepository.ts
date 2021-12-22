import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableDTO } from '@modules/cars/dtos/IFindAvailableDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(carData: ICreateCarDTO) {
    const car = this.repository.create(carData);

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    const car = await this.repository.findOne({
      license_plate: licensePlate,
    });

    return car;
  }

  async findAvailable(searchBy: IFindAvailableDTO) {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (searchBy.name) {
      carsQuery.andWhere('c.name = :name', { name: searchBy.name })
    }

    if (searchBy.brand) {
      carsQuery.andWhere('c.brand = :brand', { brand: searchBy.brand })
    }

    if (searchBy.category_id) {
      carsQuery.andWhere('c.category_id = :category_id', {
        category_id: searchBy.category_id,
      })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(carId: string) {
    const car = await this.repository.findOne({ id: carId });

    return car;
  }

  async updateAvailable(carId: string, available: boolean) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id: carId })
      .execute();
  }
}

export { CarsRepository };
