const container = document.getElementById('escapeContainer');
const scissor = document.getElementById('scissor');
const startButton = document.getElementById('startButton');
const cutSound = document.getElementById("cutSound");
const endButton = document.getElementById("endButton");
const finalMessage = document.getElementById("finalMessage");

let isChasing = false;

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  cutSound.play();
  isChasing = true;
});

function escapeFromPointer(x, y) {
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Daha dengeli kaçış gücü
  const offsetX = (centerX - x) * 1.5;
  const offsetY = (centerY - y) * 1.5;

  const maxX = window.innerWidth / 2 - 120;
  const maxY = window.innerHeight / 2 - 120;

  const moveX = Math.max(Math.min(offsetX, maxX), -maxX);
  const moveY = Math.max(Math.min(offsetY, maxY), -maxY);

  container.style.transform = `translate(${moveX}px, ${moveY}px)`;
}


function resetPosition() {
  container.style.transform = 'translate(0, 0)';
}

function moveScissor(x, y) {
  scissor.style.transform = `translate(${x}px, ${y}px)`;
}

// Başlat butonuna basılınca olayları aktif et
startButton.addEventListener('click', () => {
  isChasing = true;
  startButton.style.display = 'none';
  scissor.style.display = 'block';
});

// Mouse
document.addEventListener('mousemove', (e) => {
  if (!isChasing) return;
  moveScissor(e.clientX, e.clientY);
  escapeFromPointer(e.clientX, e.clientY);
});

// Touch
document.addEventListener('touchmove', (e) => {
  if (!isChasing || e.touches.length === 0) return;
  const touch = e.touches[0];
  moveScissor(touch.clientX, touch.clientY);
  escapeFromPointer(touch.clientX, touch.clientY);
});

document.addEventListener('mouseleave', resetPosition);
document.addEventListener('touchend', resetPosition);

// Başta endButton gizli
endButton.style.display = "none";

// "Beni Kes" butonuna tıklayınca:
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  cutSound.play();
  isChasing = true;

  // Bitir butonunu göster
  endButton.style.display = "inline-block";
});

// "Bitir" butonuna tıklanınca:
endButton.addEventListener("click", () => {
  cutSound.pause();
  cutSound.currentTime = 0;

  // Sayfayı temizle
  document.body.innerHTML = '';
  document.body.appendChild(finalMessage);

  // Final mesajını göster
  finalMessage.style.opacity = 1;
  finalMessage.style.pointerEvents = "auto";
});