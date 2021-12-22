import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';

container.register<IDateProvider>('DayjsDateProvider', DayjsDateProvider);
