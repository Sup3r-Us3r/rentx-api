import { injectable, inject } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(carData: IRequest) {
    const carAlreadyExists = await this.carsRepository
      .findByLicensePlate(carData.license_plate)

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = await this.carsRepository.create(carData);

    return car;
  }
}

export { CreateCarUseCase };
