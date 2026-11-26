var som;
var ratoImg;
var ratoFrames = [];
var frameAtual = 0;
var frameRateRato = 6;
var contadorFrames = 0;

var perguntas = [
  "A estrutura for é usada quando sabemos o número exato\n de repetições.",
  "O comando createCanvas() no p5.js é usado para definir\n a cor de fundo da tela.",
  "Um vetor (array) em JavaScript é declarado usando\n colchetes, como let vetor = [].",
  "A função background(r, g, b) no p5.js define a cor de\n fundo da tela.",
  "O operador += em JavaScript adiciona um valor\n ao valor atual da variável.",
  "Em JavaScript, um vetor pode conter elementos de tipos\n diferentes, como números e strings, no mesmo array.",
  "No JavaScript, os índices de um vetor começam a partir\n de 1.",
  "A estrutura if...else é usada para tomar decisões com\n base em condições.",
  "O comando fill() no p5.js é usado para definir a cor de\n fundo da tela."
];
var alternativas = [
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"],
  ["a) Verdadeiro", "b) Falso"]
];
var respostas = ["a", "b", "a", "a", "a", "a", "b", "a", "b"];

var cor = [];
var sta = [];
var alea, tela = 0, caixaClicada = -1, perguntaAtual;
var posicaoRatoAtual = -100;
var posicaoRatoDestino;
var velocidadeRato = 2;
var perguntasRestantes;

function embaralharPerguntas() {
  var combinadas = perguntas.map((pergunta, index) => ({
    pergunta: pergunta,
    alternativas: alternativas[index],
    resposta: respostas[index]
  }));
  combinadas.sort(() => Math.random() - 0.5);
  return combinadas;
}

function preload() {
  ratoImg = loadImage("assets/mouse.png");
  soundFormats("mp3");
  som = loadSound("assets/Audio.mp3");
}

function setup() {
  createCanvas(400, 400);
  if (!som.isPlaying()) {
    som.play();
  }
  
  for (let i = 0; i < 3; i++) { 
    ratoFrames.push(ratoImg.get(i * 32, 32, 32, 32));
  }

  for (var i = 0; i < 10; i++) {
    cor[i] = "green";
    sta[i] = 0;
  }
  alea = Math.floor(Math.random() * 10);
  sta[alea] = 1;
  perguntasRestantes = embaralharPerguntas();

  posicaoRatoAtual = -50;
  posicaoRatoDestino = width / 2 - 16;
}

function draw() {
  background("orange");

  if (posicaoRatoAtual < posicaoRatoDestino) {
    posicaoRatoAtual += velocidadeRato;
    
    contadorFrames++;
    if (contadorFrames % frameRateRato == 0) {
      frameAtual = (frameAtual + 1) % ratoFrames.length;
    }

    if (posicaoRatoAtual > posicaoRatoDestino) {
      posicaoRatoAtual = posicaoRatoDestino;
    }
  }

  image(ratoFrames[frameAtual], posicaoRatoAtual, 100, 32, 32);

  if (tela == 0) {
    textSize(30);
    fill(0);
    text("Encontre o rato!", 100, 50);
    for (var i = 0; i < 10; i++) {
      fill(cor[i]);
      rect(i * 40, 300, 40, 40);
      textSize(20);
      fill(255);
      text("?", i * 40 + 15, 330);
    }
  }

  if (tela == 1) {
    fill(0);
    textSize(20);
    text("Parabéns, você encontrou o rato!", 50, height / 2);
    fill(70, 130, 180);
    rect(11, 350, 130, 40, 15);
    textSize(15);
    fill(0);
    text("Jogar novamente", 15, 375);
  } else if (tela == 2) {
    fill(0);
    textSize(15);
    text(perguntaAtual.pergunta, 20, 50);
    textSize(18);
    for (var i = 0; i < 2; i++) {
      fill("lightblue");
      rect(20, 100 + i * 30, 360, 30);
      fill(0);
      text(perguntaAtual.alternativas[i], 40, 120 + i * 30);
    }
  } else if (tela == 3) {
    fill(255, 0, 0);
    textSize(20);
    text("Você perdeu! Tente novamente.", 50, height / 2);
    fill(70, 130, 180);
    rect(11, 350, 130, 40, 15);
    textSize(15);
    fill(0);
    text("Jogar novamente", 15, 375);
  }
}

function resetarJogo() {
  for (var i = 0; i < 10; i++) {
    cor[i] = "green";
    sta[i] = 0;
  }
  alea = Math.floor(Math.random() * 10);
  sta[alea] = 1;
  perguntasRestantes = embaralharPerguntas();

  posicaoRatoAtual = -50;
  posicaoRatoDestino = width / 2 - 16;
}

function mousePressed() {
  if (tela == 0 && mouseY >= 300 && mouseY <= 340) {
    caixaClicada = Math.floor(mouseX / 40);
    if (sta[caixaClicada] == 1) {
      tela = 1;
    } else if (sta[caixaClicada] == 0) {
      if (perguntasRestantes.length === 0) {
        perguntasRestantes = embaralharPerguntas();
      }
      perguntaAtual = perguntasRestantes.pop();
      tela = 2;
    }
  } else if (tela == 2) {
    for (var i = 0; i < 2; i++) {
      if (mouseX > 20 && mouseX < 380 && mouseY > (100 + i * 30) && mouseY < (130 + i * 30)) {
        var respostaEscolhida = perguntaAtual.alternativas[i].charAt(0);
        if (respostaEscolhida === perguntaAtual.resposta) {
          cor[caixaClicada] = "gray";
          sta[caixaClicada] = -1;
          tela = 0;
        } else {
          tela = 3;
        }
      }
    }
  }
  else if ((tela == 1 || tela == 3) && mouseX > 11 && mouseX < 140 && mouseY > 350 && mouseY < 390) {
    resetarJogo();
    tela = 0;
}
}
