import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(req: Request, res: Response) {
    const { id: carId } = req.params;
    const { specificationsId } = req.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    return res.json(car);
  }
}

export { CreateCarSpecificationController };
