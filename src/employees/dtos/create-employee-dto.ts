import { IsString, IsInt, IsDecimal } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    name: string;
    @IsString()
    title: string;
    @IsInt()
    age: number;
    @IsInt()
    salary: number;
}
