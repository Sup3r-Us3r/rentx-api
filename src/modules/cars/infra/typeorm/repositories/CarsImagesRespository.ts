import { Repository, getRepository  } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(carId: string, imageName: string) {
    const carImage = this.repository.create({
      car_id: carId,
      image_name: imageName,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
