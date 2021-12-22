import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { ProfileUserUseCase } from '@modules/accounts/useCases/profileUser/ProfileUserUseCase';

class ProfileUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id) as IUserResponseDTO;

    return res.json(user);
  }
}

export { ProfileUserController };
