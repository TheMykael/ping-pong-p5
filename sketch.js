// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 17;
let raioBolinha = diametroBolinha / 2;

// Variáveis da velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let chanceDeErrar = 0;

// Variáveis de colisão
let colisaoRaquete = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let somRaquetada;
let somPonto;
let somTrilha;

// Função de preload dos sons
function preload() {
  somRaquetada = loadSound("Raquetada.wav");
  somPonto = loadSound("Ponto.wav");
  somTrilha = loadSound("Trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  colisaoBibliotecaRaquete(xRaquete, yRaquete);
  colisaoBibliotecaRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

// Funções da bolinha
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// Funções da raquete
function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

// Função para verificar colisão da bolinha com a borda
function verificaColisaoBorda() {
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}

// Função de biblioteca para colisão da bolinha com a raquete
function colisaoBibliotecaRaquete(x, y) {
  colisaoRaquete = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if (colisaoRaquete) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  }
}

// Função para movimentar a raquete do oponente
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

// Função do placar
function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(180, 0, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(180, 0, 0);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26)
}

// Função de marcar pontos
function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    somPonto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    somPonto.play();
  }
}

// Função para aumentar ou diminuir a chance de erro do oponente
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}