import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, driver_license }: ICreateUserDTO = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return res.sendStatus(201);
  }
}

export { CreateUserController };
