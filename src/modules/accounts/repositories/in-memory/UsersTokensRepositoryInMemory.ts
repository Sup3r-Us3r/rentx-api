import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private userTokens: UserTokens[] = [];

  async create(userTokenData: ICreateUserTokenDTO) {
    const userToken = new UserTokens();

    Object.assign(userToken, userTokenData);

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return this.userTokens.find(
      userToken => (
        userToken.user_id === userId &&
        userToken.refresh_token === refreshToken
      )
    );
  }

  async deleteById(id: string) {
    const updatedUserTokens = this.userTokens
      .filter(userToken => userToken.id !== id);

    this.userTokens = updatedUserTokens;
  }

  async findByRefreshToken(refreshToken: string) {
    return this.userTokens
      .find(token => token.refresh_token === refreshToken);
  }
}

export { UsersTokensRepositoryInMemory };
