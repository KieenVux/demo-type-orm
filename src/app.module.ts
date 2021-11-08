import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'demo_type_orm',
      entities: ['dist/**/schema/*.schema{.ts,.js}'],
      logging: 'all',
      synchronize: true,
    }),
    ProductModule,
    OrderModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
