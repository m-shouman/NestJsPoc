import { IsInt, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsInt()
    id: number;
    @IsString()
    name: string;
    @IsString()
    title: string;
    @IsInt()
    age: number;
    @IsInt()
    salary: number;
}
