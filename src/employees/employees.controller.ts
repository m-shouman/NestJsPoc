import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './interfaces/employee.interface';
import { EmployeeDataValidationPipe } from './employee-data-validation.pipe';
import { CreateEmployeeDto } from './dtos/create-employee-dto';
import { UpdateEmployeeDto } from './dtos/update-employee-dto';

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) { }

    @Post()
    async create(@Body(new EmployeeDataValidationPipe) employee: CreateEmployeeDto) {
        this.employeesService.create(employee);
    }

    @Put()
    async update(@Body(new EmployeeDataValidationPipe) employee: UpdateEmployeeDto) {
        this.employeesService.update(employee);
    }

    @Delete(':id')
    async delete(@Param() params) {
        this.employeesService.delete(params.id);
    }

    @Get()
    async get(): Promise<Employee[]> {
        return this.employeesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Employee> {
        return this.employeesService.getById(id);
    }
}
