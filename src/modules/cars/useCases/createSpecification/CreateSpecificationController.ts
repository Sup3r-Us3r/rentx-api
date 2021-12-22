import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './createSpecificationUseCase';

class CreateSpecificationController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    await createSpecificationUseCase.execute({ name, description });

    return res.sendStatus(201);
  }
}

export { CreateSpecificationController };
