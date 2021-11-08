import { BaseRepository } from 'src/base/repository.base';
import { EntityRepository } from 'typeorm';
import { Employee } from './schema/employee.schema';

@EntityRepository(Employee)
export class EmployeeRepository extends BaseRepository<Employee> {}
