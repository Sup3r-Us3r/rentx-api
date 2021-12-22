import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create(userTokenData: ICreateUserTokenDTO) {
    const userToken = this.repository.create(userTokenData);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string) {
    const usersTokens = await this.repository
      .findOne({
        user_id: userId,
        refresh_token: refreshToken,
      });

    return usersTokens;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.repository.findOne({ refresh_token: refreshToken });
  }
}

export { UsersTokensRepository };
