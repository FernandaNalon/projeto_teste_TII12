// Como frontend e backend ficam no mesmo domínio,
// usamos uma rota relativa e não http://localhost:3000.
const API_URL = 'http://localhost:3000/tarefas';

const form = document.querySelector('#form-tarefa');
const inputTitulo = document.querySelector('#titulo');
const inputDescricao = document.querySelector('#descricao');
const lista = document.querySelector('#lista-tarefas');
const mensagem = document.querySelector('#mensagem');
const btnAtualizar = document.querySelector('#btn-atualizar');

function mostrarMensagem(texto, tipo = 'sucesso') {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;

  setTimeout(() => {
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
  }, 3500);
}

async function carregarTarefas() {
  lista.innerHTML = '<p class="carregando">Carregando tarefas...</p>';

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error('Não foi possível carregar as tarefas.');
    }

    const tarefas = await resposta.json();

    if (tarefas.length === 0) {
      lista.innerHTML =
        '<p class="vazio">Nenhuma tarefa cadastrada ainda.</p>';
      return;
    }

    lista.innerHTML = '';

    tarefas.forEach((tarefa) => {
      const item = document.createElement('article');

      item.className = tarefa.concluida
        ? 'tarefa concluida'
        : 'tarefa';

      const descricao = tarefa.descricao
        ? tarefa.descricao
        : 'Sem descrição.';

      item.innerHTML = `
        <div>
          <h3>${escaparHtml(tarefa.titulo)}</h3>
          <p>${escaparHtml(descricao)}</p>
        </div>

        <div class="acoes">
          <button
            type="button"
            data-acao="alternar"
            data-id="${tarefa.id}"
            data-concluida="${Boolean(tarefa.concluida)}"
          >
            ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
          </button>

          <button
            type="button"
            class="botao-remover"
            data-acao="remover"
            data-id="${tarefa.id}"
          >
            Excluir
          </button>
        </div>
      `;

      lista.appendChild(item);
    });
  } catch (erro) {
    lista.innerHTML =
      '<p class="vazio">Erro ao carregar os dados da API.</p>';

    console.error(erro);
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();

  if (!titulo) {
    mostrarMensagem('Informe o título da tarefa.', 'erro');
    return;
  }

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        descricao: descricao || undefined,
      }),
    });

    if (!resposta.ok) {
      throw new Error('Erro ao cadastrar tarefa.');
    }

    form.reset();
    mostrarMensagem('Tarefa cadastrada com sucesso!');
    await carregarTarefas();
  } catch (erro) {
    mostrarMensagem('Não foi possível cadastrar a tarefa.', 'erro');
    console.error(erro);
  }
});

lista.addEventListener('click', async (evento) => {
  const botao = evento.target.closest('button');

  if (!botao) {
    return;
  }

  const id = botao.dataset.id;
  const acao = botao.dataset.acao;

  try {
    if (acao === 'alternar') {
      const concluidaAtual = botao.dataset.concluida === 'true';

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concluida: !concluidaAtual,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao atualizar tarefa.');
      }

      mostrarMensagem('Tarefa atualizada!');
    }

    if (acao === 'remover') {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao excluir tarefa.');
      }

      mostrarMensagem('Tarefa removida!');
    }

    await carregarTarefas();
  } catch (erro) {
    mostrarMensagem('Não foi possível concluir a operação.', 'erro');
    console.error(erro);
  }
});

btnAtualizar.addEventListener('click', carregarTarefas);

// Pequena proteção para evitar injetar texto HTML vindo do banco.
function escaparHtml(valor) {
  const div = document.createElement('div');
  div.textContent = valor;
  return div.innerHTML;
}

carregarTarefas();
