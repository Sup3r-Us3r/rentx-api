import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('CreateCarUseCaseTest', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'abc',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car if exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name car1',
      description: 'Description car1',
      daily_rate: 100,
      license_plate: 'abc',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Name car2',
        description: 'Description car2',
        daily_rate: 100,
        license_plate: 'abc',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      })
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should not be able to create a car if available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Description car1',
      daily_rate: 100,
      license_plate: 'abc',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
