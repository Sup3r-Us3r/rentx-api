import { injectable, inject } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imagesName }: IRequest) {
    imagesName.forEach(async image => {
      await this.carsImagesRepository.create(carId, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };
