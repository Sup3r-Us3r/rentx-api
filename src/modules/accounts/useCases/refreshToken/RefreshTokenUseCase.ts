import { verify, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string) {
    const { sub: userId, email } = verify(refreshToken, auth.secretRefreshToken) as IPayload;

    const userToken = await this.usersTokensRepository
      .findByUserIdAndRefreshToken(userId, refreshToken);

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const newToken = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    });

    const newRefreshToken = sign(
      { email },
      auth.secretRefreshToken,
      {
        subject: userId,
        expiresIn: auth.expiresInRefreshToken,
      },
    );

    const refreshTokenExpiresDate = this.dayjsDateProvider
      .addDays(auth.expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      user_id: userId,
      refresh_token: refreshToken,
      expires_date: refreshTokenExpiresDate,
    });

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    } as IResponse;
  }
}

export { RefreshTokenUseCase };
