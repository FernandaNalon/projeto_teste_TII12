import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTarefaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  descricao?: string;
}
