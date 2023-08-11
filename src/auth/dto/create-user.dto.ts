import { IsEmail, IsOptional, IsString } from "class-validator"


export class CreateUserDto {

  @IsEmail()
  email:string

  @IsString()
  password:string

  @IsString()
  name:string

  @IsString()
  lastName:string

  @IsString()
  @IsOptional()
  rol:string

}
