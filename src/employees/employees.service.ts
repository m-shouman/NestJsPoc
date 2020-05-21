import * as fs from 'fs';
import { Injectable, HttpException } from '@nestjs/common';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDto } from './dtos/create-employee-dto';
import { UpdateEmployeeDto } from './dtos/update-employee-dto';

@Injectable()
export class EmployeesService {
    private readonly _dataFilePath: string;

    constructor() {
        this._dataFilePath = './src/employees/employees.data.json';
    }

    create(createEmployeeDto: CreateEmployeeDto): number {
        const data = this.readDataFile() as Employee[];
        const id = this.getNewId(data);

        data.push({
            id: id,
            createdAt: new Date(),
            name: createEmployeeDto.name,
            age: createEmployeeDto.age,
            salary: createEmployeeDto.salary,
            title: createEmployeeDto.title
        });

        this.updateDataFile(data);
        return id;
    }

    update(updateEmployeeDto: UpdateEmployeeDto): boolean {
        const data = this.readDataFile();
        const index = this.getIndexOfId(data, updateEmployeeDto.id);

        if (index == -1)
            throw new HttpException(`Employee with Id ${updateEmployeeDto.id} is not exist`, 400);

        const emp = {
            id: updateEmployeeDto.id,
            createdAt: data[index].createdAt,
            name: updateEmployeeDto.name,
            age: updateEmployeeDto.age,
            salary: updateEmployeeDto.salary,
            title: updateEmployeeDto.title,
        };

        const newData = data.slice(0, index).concat(emp).concat(data.slice(index + 1, data.length));
        this.updateDataFile(newData);
        return true;
    }

    delete(id: number): boolean {
        const data = this.readDataFile();
        const newData = data.filter(e => e.id != id);
        this.updateDataFile(newData);
        return true;
    }

    getAll(): Employee[] {
        return this.readDataFile();
    }

    getById(id: number): Employee {
        const data = this.readDataFile();
        return data.find(e => e.id == id);
    }

    private readDataFile(): Employee[] {
        const data = fs.readFileSync(this._dataFilePath, 'utf8');
        return JSON.parse(data) as Employee[];
    }

    private updateDataFile(newData: Employee[]) {
        fs.writeFileSync(this._dataFilePath, JSON.stringify(newData));
    }

    private getIndexOfId(employees: Employee[], id: number): number {
        return employees.map(e => e.id).indexOf(id);
    }

    private getNewId(employees: Employee[]) {
        return employees.map(e => e.id).sort()[employees.length - 1] + 1;
    }
}
