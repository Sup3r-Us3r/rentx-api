import { Category } from '../infra/typeorm/entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName: (name: string) => Promise<Category>;
  create: (data: ICreateCategoryDTO) => Promise<void>;
  list: () => Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
