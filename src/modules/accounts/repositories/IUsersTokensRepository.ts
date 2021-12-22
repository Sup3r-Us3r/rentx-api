import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create: (userTokenData: ICreateUserTokenDTO) => Promise<UserTokens>;
  findByUserIdAndRefreshToken: (
    userId: string,
    refreshToken: string
  ) => Promise<UserTokens>;
  deleteById: (id: string) => Promise<void>;
  findByRefreshToken: (refreshToken: string) => Promise<UserTokens>;
}

export { IUsersTokensRepository };
