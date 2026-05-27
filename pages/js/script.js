let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 5000);

function nextImage() {
  count++;
  if (count > 4) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}

const VISIVEIS = 4;
const trilha = document.getElementById("destaquesTrilha");
const dots = document.getElementById("destaquesDots");
const btnAnterior = document.getElementById("destaquesAnterior");
const btnProximo = document.getElementById("destaquesPróximo");

const totalCards = trilha.children.length;
let indiceAtual = 0;
let intervalo;

// Clona os cards no início e no fim para o loop infinito
const cardsOriginais = Array.from(trilha.children);
const clonesFim = cardsOriginais.map((c) => c.cloneNode(true));
const clonesInicio = cardsOriginais.map((c) => c.cloneNode(true));

clonesFim.forEach((c) => trilha.appendChild(c));
clonesInicio
  .reverse()
  .forEach((c) => trilha.insertBefore(c, trilha.firstChild));

// Começa na posição correta (após os clones do início)
indiceAtual = totalCards;
trilha.style.transition = "none";
atualizarSlider();

// Gera dots (apenas para os cards originais)
for (let i = 0; i < totalCards; i++) {
  const dot = document.createElement("button");
  dot.className = "destaques-dot" + (i === 0 ? " destaques-dot--ativo" : "");
  dot.addEventListener("click", () => {
    irPara(i + totalCards);
    reiniciarIntervalo();
  });
  dots.appendChild(dot);
}

function atualizarSlider() {
  const larguraCard = trilha.children[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(trilha).gap) || 28.8;
  trilha.style.transform = `translateX(-${indiceAtual * (larguraCard + gap)}px)`;

  const dotIndex = (indiceAtual - totalCards + totalCards) % totalCards;
  document.querySelectorAll(".destaques-dot").forEach((dot, i) => {
    dot.classList.toggle("destaques-dot--ativo", i === dotIndex);
  });
}

function irPara(index) {
  indiceAtual = index;
  trilha.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  atualizarSlider();
}

function verificarLoop() {
  // Se passou dos clones do fim, pula para os originais silenciosamente
  if (indiceAtual >= totalCards * 2) {
    indiceAtual = totalCards;
    trilha.style.transition = "none";
    atualizarSlider();
  }
  // Se voltou para os clones do início, pula para os originais do fim
  if (indiceAtual < totalCards) {
    indiceAtual = totalCards * 2 - 1;
    trilha.style.transition = "none";
    atualizarSlider();
  }
}

trilha.addEventListener("transitionend", verificarLoop);

function proximo() {
  irPara(indiceAtual + 1);
}
function anterior() {
  irPara(indiceAtual - 1);
}

btnProximo.addEventListener("click", () => {
  proximo();
  reiniciarIntervalo();
});
btnAnterior.addEventListener("click", () => {
  anterior();
  reiniciarIntervalo();
});

function iniciarIntervalo() {
  intervalo = setInterval(proximo, 3000);
}
function reiniciarIntervalo() {
  clearInterval(intervalo);
  iniciarIntervalo();
}

iniciarIntervalo();
window.addEventListener("resize", atualizarSlider);
