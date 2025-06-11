function abrirFuncao(funcao) {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = `<h2>Carregando ${funcao}...</h2>`;

  switch (funcao) {
    case 'produtor':
      conteudo.innerHTML = `<p>Os produtores são seres vivos que produzem seu próprio alimento...</p>`;
      break;
    case 'consumidor':
      conteudo.innerHTML = `<p>Os consumidores se alimentam de outros seres vivos...</p>`;
      break;
    case 'decompositor':
      conteudo.innerHTML = `<p>Decompositores reciclam a matéria orgânica...</p>`;
      break;
    case 'biomas':
      // aqui você pode carregar um mapa com JS interativo
      break;
    case 'jogo':
      // aqui você pode carregar um mini quiz de cadeia alimentar
      break;
    case 'simulador':
      // simular um ecossistema interativo com regras simples
      break;
    case 'relatorio':
      gerarRelatorioPDF();
      break;
  }
}
// Em renderer.js
import jsPDF from 'jspdf';

function gerarRelatorioPDF() {
  const doc = new jsPDF();
  doc.text("Relatório da Cadeia Alimentar", 10, 10);
  doc.text("Você explorou: Produtores, Consumidores e Decompositores.", 10, 20);
  doc.save("relatorio_cadeia_alimentar.pdf");
}
