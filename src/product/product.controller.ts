import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(protected readonly service: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  createProduct(@Body() product: Product) {
    return this.service.createProduct(product);
  }
  @Post('/query')
  @ApiOperation({ summary: 'Create Product by Query' })
  createProductByQuery(@Body() product: Product) {
    return this.service.createProductByQuery(product);
  }

  @Get()
  @ApiOperation({ summary: 'Get Product' })
  getAllProduct() {
    return this.service.getAllProduct();
  }

  @Post('buy')
  @ApiOperation({ summary: 'Add Product To Employee' })
  buyProduct(
    @Query('employeeId') employeeId: string,
    @Query('productId') productId: string,
  ) {
    return this.service.buyProduct(employeeId, productId);
  }

  @Post('/bulkInsert')
  @ApiOperation({ summary: 'Add many Product' })
  @ApiBody({ type: [Product] })
  addManyProduct(@Body() product: Product[]) {
    return this.service.bulkInsert(product);
  }
}
