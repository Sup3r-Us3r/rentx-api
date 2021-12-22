import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string) {
    return this.specifications
      .find(specification => specification.name === name);
  }

  async findByIds(ids: string[]) {
    return this.specifications
      .filter(specification => ids.includes(specification.id));
  }
}

export { SpecificationsRepositoryInMemory };
