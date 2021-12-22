import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const images = req.files as Express.Multer.File[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map(image => image.filename);

    await uploadCarImagesUseCase.execute({
      carId: id,
      imagesName: fileNames,
    });

    return res.sendStatus(201);
  }
}

export { UploadCarImagesController };
