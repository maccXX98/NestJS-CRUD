import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z\s]*$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+])[A-Za-z\d@$!%*?&#^+]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 letra mayúscula, 1 número y 1 carácter especial.',
    },
  )
  password: string;

  @IsString()
  @IsOptional()
  authStrategy: string;
}
