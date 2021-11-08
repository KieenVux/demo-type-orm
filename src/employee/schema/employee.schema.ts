import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, Length } from 'class-validator';
import { BaseInfo } from 'src/base/entity.base';
import { Product } from 'src/product/schema/product.schema';
import { Role } from 'src/shared/role.shared';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('employee')
export class Employee extends BaseInfo {
  @Column({ name: 'first_name' })
  @Length(2, 6)
  firstName: string;

  @Column({ name: 'last_name' })
  @Length(2, 6)
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', default: null })
  image: any;

  @Column({ type: 'enum', enum: Role, default: Role.Employee })
  role: string;

  @ManyToMany(() => Product, (product) => product.employees)
  products: Product[];
}

export class EmployeeToUpdate extends PartialType(Employee) {}
