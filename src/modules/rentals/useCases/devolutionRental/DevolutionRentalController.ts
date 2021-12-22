import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { id } = req.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, userId });

    return res.json(rental);
  }
}

export { DevolutionRentalController };
