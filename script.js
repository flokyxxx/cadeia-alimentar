function entrarApp() {
  document.getElementById('telaInicial').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

function toggleMenu() {
  const menu = document.getElementById('menuLateral');
  menu.classList.toggle('aberto');
}

let audioAtual = null;

function tocarAudio(nome) {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }
  audioAtual = new Audio(`audios/${nome}.mp3`);
  audioAtual.play();

  if (!localStorage.getItem('audio_' + nome)) {
    localStorage.setItem('audio_' + nome, 'true');
  }

  if (
    localStorage.getItem('audio_produtor') === 'true' &&
    localStorage.getItem('audio_consumidor') === 'true' &&
    localStorage.getItem('audio_decompositor') === 'true' &&
    !localStorage.getItem('medalha_curioso')
  ) {
    localStorage.setItem('medalha_curioso', 'true');
  }
}

function mostrarBiomas() {
  const div = document.getElementById('conteudo');
  div.innerHTML = `
    <h3>Biomas do Brasil</h3>
    <img src="imagens/biomas-brasil.png" alt="Biomas do Brasil">
    <p>O Brasil possui 6 biomas principais: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa.</p>
    <button onclick="fecharConteudo()">Fechar</button>
  `;
  div.style.display = 'block';

  if (!localStorage.getItem('medalha_explorador')) {
    localStorage.setItem('medalha_explorador', 'true');
  }
}

function fecharConteudo() {
  const div = document.getElementById('conteudo');
  div.style.display = 'none';
  div.innerHTML = '';
}

function iniciarQuiz() {
  const perguntas = [
    {
      pergunta: "Quem é responsável por produzir o próprio alimento?",
      opcoes: ["Consumidor", "Produtor", "Decompositor"],
      correta: 1
    },
    {
      pergunta: "Qual é o papel do decompositor na cadeia alimentar?",
      opcoes: ["Produzir energia", "Comer plantas", "Reciclar matéria orgânica"],
      correta: 2
    },
    {
      pergunta: "Qual destes é um exemplo de consumidor?",
      opcoes: ["Árvore", "Leão", "Cogumelo"],
      correta: 1
    }
  ];

  let indice = 0;
  let pontos = 0;

  if (!localStorage.getItem('medalha_desafiante')) {
    localStorage.setItem('medalha_desafiante', 'true');
  }

  mostrarPergunta();

  function mostrarPergunta() {
    const atual = perguntas[indice];
    let html = `<h3>${atual.pergunta}</h3>`;

    atual.opcoes.forEach((opcao, i) => {
      html += `<button onclick='verificarResposta(${i})' style='margin: 5px;'>${opcao}</button><br>`;
    });

    html += `<p>Pergunta ${indice + 1} de ${perguntas.length}</p>`;
    document.getElementById('conteudo').innerHTML = html;
    document.getElementById('conteudo').style.display = 'block';
  }

  function verificarResposta(resposta) {
    const correta = perguntas[indice].correta;
    if (resposta === correta) {
      pontos++;
      alert("✅ Resposta correta!");
    } else {
      alert("❌ Resposta incorreta!");
    }

    indice++;
    if (indice < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    if (pontos === perguntas.length && !localStorage.getItem('medalha_mestre')) {
      localStorage.setItem('medalha_mestre', 'true');
    }

    document.getElementById('conteudo').innerHTML = `
      <h3>Fim do Desafio!</h3>
      <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> perguntas.</p>
      <button onclick="fecharConteudo()">Fechar</button>
    `;
  }
}

function mostrarCuriosidade() {
  const curiosidades = [
    "As plantas produzem seu próprio alimento pela fotossíntese.",
    "Decompositores reciclam matéria orgânica.",
    "Consumidores podem ser herbívoros, carnívoros ou onívoros.",
    "Sem produtores, a cadeia alimentar entra em colapso.",
    "O ser humano é um consumidor onívoro."
  ];

  const aleatoria = curiosidades[Math.floor(Math.random() * curiosidades.length)];

  const div = document.getElementById('conteudo');
  div.innerHTML = `
    <h3>Curiosidade</h3>
    <p>${aleatoria}</p>
    <button onclick="fecharConteudo()">Fechar</button>
  `;
  div.style.display = 'block';
}

function mostrarMedalhas() {
  const div = document.getElementById('conteudo');

  const m1 = localStorage.getItem('medalha_explorador') === 'true';
  const m2 = localStorage.getItem('medalha_curioso') === 'true';
  const m3 = localStorage.getItem('medalha_desafiante') === 'true';
  const m4 = localStorage.getItem('medalha_mestre') === 'true';

  let html = '<h3>Suas Medalhas</h3>';

  if (m1) html += `<p>🥇 Explorador: acessou o Mapa de Biomas</p>`;
  if (m2) html += `<p>🥈 Curioso: ouviu todos os áudios</p>`;
  if (m3) html += `<p>🥉 Desafiante: participou do quiz</p>`;
  if (m4) html += `<p>🏅 Mestre da Cadeia: acertou todas as perguntas</p>`;

  if (!m1 && !m2 && !m3 && !m4) {
    html += `<p>😕 Nenhuma medalha conquistada ainda. Explore o app!</p>`;
  }

  html += `<button onclick="fecharConteudo()">Fechar</button>`;

  div.innerHTML = html;
  div.style.display = 'block';
}
function mostrarEnciclopedia() {
  const elementos = [
    {
      nome: "Leão",
      imagem: "imagens/enciclopedia/leao.jpg",
      descricao: "O leão é um consumidor carnívoro e está no topo da cadeia alimentar em seu habitat natural."
    },
    {
      nome: "Árvore",
      imagem: "imagens/enciclopedia/arvore.jpg",
      descricao: "As árvores são seres produtores que realizam fotossíntese para produzir seu próprio alimento."
    },
    {
      nome: "Fungo",
      imagem: "imagens/enciclopedia/fungo.jpg",
      descricao: "Os fungos são decompositores que reciclam matéria orgânica e ajudam a manter o equilíbrio ecológico."
    }
  ];

  let html = "<h3>Enciclopédia da Natureza</h3>";

  elementos.forEach((e) => {
    html += `
      <div style="margin-bottom: 30px; text-align: center;">
        <h4>${e.nome}</h4>
        <img src="${e.imagem}" alt="${e.nome}" style="max-width: 100%; max-height: 300px; border-radius: 10px; margin-top: 10px;"><br>
        <p style="margin-top: 10px;">${e.descricao}</p>
      </div>
    `;
  });

  html += `<button onclick="fecharConteudo()">Fechar</button>`;

  const div = document.getElementById("conteudo");
  div.innerHTML = html;
  div.style.display = "block";
}
