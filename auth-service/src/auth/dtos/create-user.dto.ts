import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  profilePicture: string;

  @MinLength(8)
  password: string;

  origin: string;
}
