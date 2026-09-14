import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTarefaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @IsOptional()
  titulo?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  descricao?: string;

  @IsBoolean()
  @IsOptional()
  concluida?: boolean;
}
