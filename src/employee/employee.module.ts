import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [EmployeeService],
  controllers: [EmployeeController],
  imports: [
    TypeOrmModule.forFeature([EmployeeRepository]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class EmployeeModule {}
