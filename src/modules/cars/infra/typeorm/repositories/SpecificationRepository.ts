import { Repository, getRepository } from 'typeorm';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async list() {
    const allSpecifications = await this.repository.find();

    return allSpecifications;
  }

  async findByIds(ids: string[]) {
    const allSpecifications = await this.repository.findByIds(ids);

    return allSpecifications;
  }
}

export { SpecificationRepository };
