import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ProductRepository } from './product.repository';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    protected readonly repository: ProductRepository,
  ) {}

  createProduct(product: Product) {
    return this.repository.createItem(product);
  }

  createProductByQuery(product: Product) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(product)
      .execute();
  }

  getAllProduct() {
    return this.repository.findAllItem();
  }

  buyProduct(employeeId: string, productId: string) {
    return this.repository.buyProduct(employeeId, productId);
  }

  async bulkInsert(products: Product[]) {
    products.map((product) => {
      product.id = nanoid(10);
    });
    await this.repository
      .createQueryBuilder('product')
      .insert()
      .into(Product)
      .values(products)
      .execute();
  }
}
