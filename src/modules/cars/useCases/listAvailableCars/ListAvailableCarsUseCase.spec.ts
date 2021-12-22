import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('ListAvailableCarsUseCaseTest', () => {
  let carsRepository: CarsRepositoryInMemory;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      name: 'Car1',
      description: 'Description1',
      daily_rate: 100,
      license_plate: 'AAA',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Car1',
      description: 'Description1',
      daily_rate: 100,
      license_plate: 'AAA',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Car1',
      description: 'Description1',
      daily_rate: 100,
      license_plate: 'AAA',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'brand1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepository.create({
      name: 'Car1',
      description: 'Description1',
      daily_rate: 100,
      license_plate: 'AAA',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
