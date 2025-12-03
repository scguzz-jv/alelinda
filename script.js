/* ---------------------------------------
   NUEVO SISTEMA — ABRIR REGALO CON TOQUES
--------------------------------------- */

const telon = document.getElementById("telon");
const touchEffect = document.getElementById("touchEffect");

let toqueCount = 0;
const TOQUES_NECESARIOS = 20; // Número de toques para abrir

// Efecto visual de toque
function mostrarToque(x, y) {
  touchEffect.style.left = x + "px";
  touchEffect.style.top = y + "px";

  touchEffect.classList.remove("active");
  void touchEffect.offsetWidth; // truco para reiniciar animación
  touchEffect.classList.add("active");

  setTimeout(() => {
    touchEffect.classList.remove("active");
  }, 300);
}

// Abrir el regalo al completar los toques
function abrirRegalo() {
  telon.classList.add("abierto");

  setTimeout(() => {
    telon.style.display = "none";
  }, 700);
}

// Manejo del toque (tanto móvil como PC)
telon.addEventListener("click", (e) => {
  toqueCount++;

  // Efecto del toque
  mostrarToque(e.clientX, e.clientY);

  if (toqueCount >= TOQUES_NECESARIOS) {
    abrirRegalo();
  }
});

telon.addEventListener("touchstart", (e) => {
  toqueCount++;

  const touch = e.touches[0];
  mostrarToque(touch.clientX, touch.clientY);

  if (toqueCount >= TOQUES_NECESARIOS) {
    abrirRegalo();
  }
});

/* ---------------------------------------
   NAVEGACIÓN DE TABS
--------------------------------------- */
function goToTab(n) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const dest = document.getElementById('tab' + n);
  if (dest) dest.classList.add('active');
}

/* ---------------------------------------
   CORAZONES FLOTANTES (LOS QUE SE MUEVEN)
--------------------------------------- */
const heartsContainer = document.getElementById('hearts');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (5 + Math.random() * 5) + 's';
  heart.style.background = ['#ff4d6d', '#ff6b81', '#ff8fab'][Math.floor(Math.random() * 3)];
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 200);

/* ---------------------------------------
   CORAZONES DE FONDO (YA NO ESTÁTICOS)
--------------------------------------- */
(function makeHearts(){
  const container = document.getElementById('hearts');
  const colors = ['#ff6b81','#ff8fab','#ff4d6d'];

  for(let i = 0; i < 18; i++){
    const h = document.createElement('div');
    h.className = 'heart';

    const size = 10 + Math.round(Math.random()*18);
    h.style.width = size+'px';
    h.style.height = size+'px';

    h.style.left = (Math.random()*100)+'vw';
    h.style.top = (Math.random()*70)+'vh';

    h.style.background = colors[Math.floor(Math.random()*colors.length)];

    const dur = 8000 + Math.random()*12000;
    h.style.animationDuration = dur + 'ms';

    h.style.opacity = 0.8 + Math.random()*0.2;
    h.style.pointerEvents = 'none';

    /* 🔥 AQUÍ SE APLICA LA ANIMACIÓN CORRECTA */
    h.style.animationName = 'floatUp';

    container.appendChild(h);
  }
})();

/* ---------------------------------------
   APAGAR VELAS + EFECTOS
--------------------------------------- */
let velasApagadas = false;

function extinguirVelas() {
  if (velasApagadas) return;

  const flames = document.querySelectorAll('.flame');

  flames.forEach((flame, index) => {
    setTimeout(() => {
      flame.classList.remove('on');
      flame.classList.add('off');
    }, index * 100);
  });

  setTimeout(() => crearParticulasCelebracion(), 200);
  setTimeout(() => reproducirAplausos(), 400);

  velasApagadas = true;
}

/* partículas */
function crearParticulasCelebracion(){
  const colors = ['#ff4d6d','#ffe066','#a0e7e5','#b4f8c8','#ffcbf2'];
  const cakeWrap = document.getElementById('cakeWrap');
  const rect = cakeWrap.getBoundingClientRect();

  for(let i = 0; i < 12; i++){
    const particle = document.createElement('div');
    particle.className = 'pop-particle';
    particle.style.left = rect.left + rect.width/2 + 'px';
    particle.style.top = rect.top + rect.height/3 + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = colors[Math.floor(Math.random()*colors.length)];
    particle.style.borderRadius = '50%';

    const angle = (Math.random() * Math.PI * 2);
    const distance = 100 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 120;

    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 700);
  }
}

/* audio */
function reproducirAplausos(){
  const audio = document.getElementById('applauseAudio');
  if(!audio) return;

  audio.currentTime = 0;
  audio.volume = 1;

  const playPromise = audio.play();
  if(playPromise !== undefined){
    playPromise.catch(() => {});
  }
}

/* click en pastel también apaga velas */
document.addEventListener('click', function (e){
  const t5 = document.getElementById('tab5');
  if(t5 && t5.classList.contains('active')){
    const cakeWrap = document.getElementById('cakeWrap');
    if(cakeWrap && cakeWrap.contains(e.target)){
      extinguirVelas();
    }
  }
});
