import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(userId);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
