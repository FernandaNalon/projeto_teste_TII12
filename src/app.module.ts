import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { TarefasModule } from './tarefas/tarefas.module';

@Module({
  imports: [
    // Carrega as variáveis de ambiente e deixa o ConfigService global.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Faz o NestJS servir o frontend da pasta public.
    // Assim, acessar "/" abre public/index.html.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    DatabaseModule,
    TarefasModule,
  ],
})
export class AppModule {}
