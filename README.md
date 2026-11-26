# Encontre o Rato!

Este foi um dos primeiros projetos que fiz na faculdade, na disciplina de **Lógica de Programação**. Usei JavaScript e p5.js para criar um jogo que combina uma busca por um rato escondido com perguntas de verdadeiro ou falso. Foi uma das minhas primeiras experiências usando vetores, condicionais, laços e eventos do mouse em um projeto interativo.

## Como jogar

1. Clique em uma das dez caixas para tentar encontrar o rato.
2. Se a caixa estiver vazia, responda à pergunta sobre JavaScript ou p5.js. Um acerto elimina a caixa e permite continuar. Um erro encerra a rodada.
3. Use **Jogar novamente** para reiniciar. A posição do rato e a ordem das perguntas mudam entre as partidas.

## Como executar

Com Python 3 instalado, inicie um servidor local na raiz do repositório.

```sh
python -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000) no navegador. A página carrega p5.js e p5.sound por CDN e usa o sprite e o áudio da pasta `assets/`.

O arquivo `sketch.js` reúne as perguntas, as regras e a animação. `index.html` carrega o jogo e `style.css` define o estilo básico da página.
