import { randomBytes } from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  fileFilter: (req, file, cb) => {
    const allowMimes = ['text/csv', 'image/jpeg', 'image/jpg', 'image/png'];

    if (!allowMimes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const hash = randomBytes(6).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      return cb(null, filename);
    },
  }),
};
