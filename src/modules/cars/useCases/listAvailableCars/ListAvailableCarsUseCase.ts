import { injectable, inject } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(searchBy: IRequest) {
    const cars = await this.carsRepository.findAvailable(searchBy);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
