import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
