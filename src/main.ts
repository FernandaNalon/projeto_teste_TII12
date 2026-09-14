import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite validar automaticamente os dados recebidos nos DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Como o front e o back ficam no mesmo domínio, CORS não é essencial
  // neste exemplo, mas mantemos habilitado para facilitar testes.
  app.enableCors();

  // Na máquina local usa 3000.
  // Na Hostinger usa a porta fornecida pela plataforma.
  const port = process.env.PORT ?? 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
