//  - DRAG DE LAS IMAGENES - 

gsap.registerPlugin(Draggable);

// 1. Forzamos a GSAP a aceptar la posición del CSS (rem, !important, etc.)
gsap.set(".draggable", { 
  x: 0, 
  y: 0 
});

// 2. Creamos el Draggable una sola vez con todas las opciones
Draggable.create(".draggable", {
  bounds: ".drag-area",
  inertia: true,
  dragClickables: true,
  allowEventDefault: true,
  onPress: function() {
    // Esto refresca la posición para que no salte al tocarlo
    this.update(); 
  }
});

// TRAIL 

// Cambiamos la selección al contenedor de la sección
const hoverSection = document.querySelector('#hover');
// Necesitamos el párrafo para leer los datos de las imágenes (data-img)
const textElement = hoverSection.querySelector('.text-hover p');

let trail = []; 
let intervalId = null;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Ahora el evento escucha a toda la sección #hover
hoverSection.addEventListener('mouseenter', () => {
  const imgs = textElement.dataset.img.split(',');
  let index = 0;

  // Limpia trail anterior
  trail.forEach(img => gsap.to(img, {opacity: 0, duration: 0.3, onComplete: () => img.remove()}));
  trail = [];

  intervalId = setInterval(() => {
    if(index >= imgs.length) {
      clearInterval(intervalId);
      return;
    }
    
    const img = document.createElement('img');
    img.src = imgs[index];
    img.classList.add('trail-img');
    
    const randomRotation = Math.floor(Math.random() * 30) - 15;
    
    document.body.appendChild(img);
    trail.push(img);

    gsap.set(img, {
      x: mouseX,
      y: mouseY,
      rotation: randomRotation,
      opacity: 0,
      scale: 0.5
    });

    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    index++;
  }, 200); 
});

hoverSection.addEventListener('mouseleave', () => {
  clearInterval(intervalId);
  intervalId = null;
  trail.forEach(img => gsap.to(img, {opacity: 0, duration: 0.5, onComplete: () => img.remove()}));
  trail = [];
});

// Loop de animación (mantiene la separación extrema)
function animate() {
  let targetX = mouseX;
  let targetY = mouseY;

  trail.forEach((img, i) => {
    const delayFactor = 0.12; 
    
    const currentX = gsap.getProperty(img, "x");
    const currentY = gsap.getProperty(img, "y");

    const vx = (targetX - currentX) * delayFactor;
    const vy = (targetY - currentY) * delayFactor;

    gsap.set(img, {
      x: currentX + vx,
      y: currentY + vy
    });

    // Separación exagerada hacia la izquierda
    targetX = currentX - 80; // He subido a 80 para que se note aún más la distancia
    targetY = currentY + 15; 
  });

  requestAnimationFrame(animate);
}

animate();