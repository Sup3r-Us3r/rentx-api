import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('SendForgotPasswordMailUseCaseTest', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'User test',
      email: 'user@mail.com',
      password: '123456',
      driver_license: '123456',
      avatar: '',
      created_at: new Date(),
      is_admin: false,
      avatar_url: () => '',
    });

    await sendForgotPasswordMailUseCase.execute('user@mail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('user@mail.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to send an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      name: 'User test',
      email: 'user@mail.com',
      password: '123456',
      driver_license: '123456',
      avatar: '',
      created_at: new Date(),
      is_admin: false,
      avatar_url: () => '',
    });

    await sendForgotPasswordMailUseCase.execute('user@mail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
