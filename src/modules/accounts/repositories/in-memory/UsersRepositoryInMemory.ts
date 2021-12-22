import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(userData: User) {
    const user = new User();

    Object.assign(user, userData);

    this.users.push(user);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}

export { UsersRepositoryInMemory };
