import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsNumber,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z\s]*$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z\s]*$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  lastName: string;

  @IsNumber()
  age: number;
}
