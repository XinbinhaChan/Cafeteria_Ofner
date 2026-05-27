const totalCards = 6;
const visibleCards = 3;
const maxIndex = totalCards - visibleCards;
let currentIndex = 0;
let autoInterval;

const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Cria os dots dinamicamente
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => { goTo(i); resetInterval(); });
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  const cardWidth = track.children[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap);
  track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlider();
}

function next() { goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1); }
function prev() { goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1); }

nextBtn.addEventListener('click', () => { next(); resetInterval(); });
prevBtn.addEventListener('click', () => { prev(); resetInterval(); });

function startInterval() {
  autoInterval = setInterval(next, 3000);
}

function resetInterval() {
  clearInterval(autoInterval);
  startInterval();
}

startInterval();
window.addEventListener('resize', updateSlider);