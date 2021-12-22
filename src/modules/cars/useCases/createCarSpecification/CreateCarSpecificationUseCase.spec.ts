import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

describe('CreateCarSpecificationUseCaseTest', () => {
  let carsRepository: ICarsRepository;
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let specificationsRepository: ISpecificationsRepository;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it('should not be able to add a new specification to a non existent car', async () => {
    const carId = '12345';
    const specificationsId = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({
        carId,
        specificationsId,
      })
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'abc',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    const specification = await specificationsRepository.create({
      name: 'Specification test',
      description: 'Specification description',
    });

    const specificationsId = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
