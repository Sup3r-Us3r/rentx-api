import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableDTO } from '@modules/cars/dtos/IFindAvailableDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(carData: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, carData);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    return this.cars.find(car => car.license_plate === licensePlate);
  }

  async findAvailable(searchBy: IFindAvailableDTO) {
    const allCars = this.cars
      .filter(car => car.available)
      .filter(car =>
        (searchBy.name && car.name === searchBy.name) ||
        (searchBy.brand && car.brand === searchBy.brand) ||
        (searchBy.category_id && car.category_id === searchBy.category_id) ||
        true
      );

    return allCars;
  }

  async findById(carId: string) {
    return this.cars.find(car => car.id === carId);
  }

  async updateAvailable(carId: string, available: boolean) {
    const carFindIndex = this.cars.findIndex(car => car.id === carId);

    this.cars[carFindIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
