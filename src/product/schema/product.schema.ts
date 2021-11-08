import { PartialType } from '@nestjs/mapped-types';
import { Length } from 'class-validator';
import { BaseInfo } from 'src/base/entity.base';
import { Employee } from 'src/employee/schema/employee.schema';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('product')
export class Product extends BaseInfo {
  @Column({ name: 'name' })
  @Length(3, 6)
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'expiry_date' })
  exp: string;

  @Column({ name: 'mfg' })
  mfg: string;

  @ManyToMany(() => Employee, (employee) => employee.products)
  @JoinTable({
    name: 'employee_product',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'employee_id' },
  })
  employees: Employee[];
}

export class ProductToUpdate extends PartialType(Product) {}
