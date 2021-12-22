import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create: (userData: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User>;
  findById: (userId: string) => Promise<User>;
}

export { IUsersRepository };
