import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async findByName(name: string) {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async list() {
    const allCategories = await this.repository.find();

    return allCategories;
  }
}

export { CategoriesRepository };
