import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObject } from 'src/shared/response.shared';
import { EmployeeRepository } from './employee.repository';
import { Employee, EmployeeToUpdate } from './schema/employee.schema';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    protected readonly repository: EmployeeRepository,
  ) {}

  async createEmployee(item: Employee) {
    const employee = await this.repository.createItem(item);
    return new ResponseObject(StatusCodes.OK, ReasonPhrases.OK, employee);
  }

  async getEmployeeById(id: string) {
    const employee = await this.repository.findById(id);
    return new ResponseObject(StatusCodes.OK, ReasonPhrases.OK, employee);
  }

  getAllEmployee() {
    return this.repository.findAllItem({});
  }

  deleteEmployeeById(id: string) {
    return this.repository.deleteItem(id);
  }

  restoreEmployeeById(id: string) {
    return this.repository.restoreItem(id);
  }

  updateEmployeeById(id: string, employee: EmployeeToUpdate) {
    return this.repository.updateItem(id, employee);
  }

  async testFind(id: number) {
    return this.repository.findOne(id);
  }
}
