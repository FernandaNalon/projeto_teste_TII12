import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(private readonly databaseService: DatabaseService) {}

  async listar() {
    return this.databaseService.query(
      'SELECT id, titulo, descricao, concluida, criado_em FROM tarefas ORDER BY id DESC',
    );
  }

  async buscarPorId(id: number) {
    const tarefas = (await this.databaseService.query(
      'SELECT id, titulo, descricao, concluida, criado_em FROM tarefas WHERE id = ?',
      [id],
    )) as RowDataPacket[];

    if (tarefas.length === 0) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefas[0];
  }

  async criar(dto: CreateTarefaDto) {
    const resultado = (await this.databaseService.query(
      'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
      [dto.titulo, dto.descricao ?? null],
    )) as ResultSetHeader;

    return this.buscarPorId(resultado.insertId);
  }

  async atualizar(id: number, dto: UpdateTarefaDto) {
    // Primeiro verifica se a tarefa existe.
    const atual = await this.buscarPorId(id);

    const titulo = dto.titulo ?? atual.titulo;
    const descricao =
      dto.descricao !== undefined ? dto.descricao : atual.descricao;
    const concluida =
      dto.concluida !== undefined ? dto.concluida : Boolean(atual.concluida);

    await this.databaseService.query(
      `UPDATE tarefas
       SET titulo = ?, descricao = ?, concluida = ?
       WHERE id = ?`,
      [titulo, descricao, concluida, id],
    );

    return this.buscarPorId(id);
  }

  async remover(id: number) {
    await this.buscarPorId(id);

    await this.databaseService.query(
      'DELETE FROM tarefas WHERE id = ?',
      [id],
    );

    return {
      mensagem: 'Tarefa removida com sucesso',
    };
  }
}
