import { BaseRepository } from 'src/base/repository.base';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { EntityRepository, getCustomRepository } from 'typeorm';
import { Product } from './schema/product.schema';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
  async buyProduct(employeeId: string, productId: string) {
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const employee = await employeeRepository.findOneOrFail(employeeId, {
      relations: ['products'],
    });
    const product = await this.findOneOrFail(productId);
    console.log('Product :' + product);
    employee.products.push(product);
    console.log(employee);
    return employee.save();
  }
}
