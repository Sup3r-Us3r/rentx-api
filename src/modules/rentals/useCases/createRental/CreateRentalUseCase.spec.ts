import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('CreateRentalUseCaseTest', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  let rentalsRepository: RentalsRepositoryInMemory;
  let carsRepository: CarsRepositoryInMemory;
  let createRentalUseCase: CreateRentalUseCase;
  let dayjsDateProvider: DayjsDateProvider;

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'Car1',
      description: 'Description1',
      daily_rate: 100,
      license_plate: 'AAA',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category_id',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another to the same user', async () => {
    await rentalsRepository.create({
      userId: '123456',
      carId: '111',
      expectedReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: '222',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('should not be able to create a new rental if there is another to the same car', async () => {
    await rentalsRepository.create({
      userId: '123456',
      carId: '111',
      expectedReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: '111',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: '111',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
