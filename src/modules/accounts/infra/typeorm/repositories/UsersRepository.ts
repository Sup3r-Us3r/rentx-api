import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    avatar,
    driver_license,
  }: ICreateUserDTO) {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    const user = this.repository.findOne({ email });

    return user;
  }

  async findById(userId: string) {
    const user = this.repository.findOne({ id: userId });

    return user;
  }
}

export { UsersRepository };
