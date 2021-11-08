import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from 'src/shared/role.shared';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeToUpdate } from './schema/employee.schema';

@Controller('employee')
@ApiTags('employee')
@ApiBasicAuth()
export class EmployeeController {
  constructor(protected readonly service: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Employee' })
  @ApiResponse({
    status: 200,
    description: 'Create Success',
    type: () => Employee,
  })
  @ApiQuery({ name: 'role', enum: Role })
  async createEmployee(@Body() employee: Employee) {
    return this.service.createEmployee(employee);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Employee' })
  getAllEmployee() {
    return this.service.getAllEmployee();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Employee By Id' })
  @ApiResponse({ type: () => Employee })
  async getEmployeeById(@Param('id') id: string) {
    const employee = await this.service.getEmployeeById(id);
    //todo: dùng để k hiện 1 field lên
    //todo: lastName sẽ bị ẩn đi
    employee.data.lastName = undefined;
    return employee;
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Employee' })
  deleteEmployeeById(@Query('id') id: string) {
    return this.service.deleteEmployeeById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Restore Employee' })
  restoreEmployeeById(@Param('id') id: string) {
    return this.service.restoreEmployeeById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Employee' })
  @ApiBody({ type: [Employee] })
  updateEmployeeById(
    @Param('id') id: string,
    @Body() employee: EmployeeToUpdate,
  ) {
    return this.service.updateEmployeeById(id, employee);
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.service.testFind(id);
  // }
}
