//  - DRAG DE LAS IMAGENES - 

gsap.registerPlugin(Draggable);

gsap.set(".draggable", { 
  x: 0, 
  y: 0 
});

Draggable.create(".draggable", {
  bounds: ".drag-area",
  inertia: true,
  dragClickables: true,
  allowEventDefault: true,
  onPress: function() {
    this.update(); 
  }
});

// TRAIL 

const hoverSection = document.querySelector('#hover');
const textElement = hoverSection.querySelector('.text-hover p');

let trail = []; 
let intervalId = null;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

hoverSection.addEventListener('mouseenter', () => {
  const imgs = textElement.dataset.img.split(',');
  let index = 0;

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

    targetX = currentX - 80; 
    targetY = currentY + 15; 
  });

  requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".centro-menu h1");
  const bgIzq = document.querySelector(".img-izq img:not(.mueble-encima)");
  const svgIzq = document.querySelector(".mueble-encima");
  const bgDech = document.querySelector(".img-dech img:not(.mueble-encima2)");
  const svgDech = document.querySelector(".mueble-encima2");
  const allElements = [bgIzq, svgIzq, bgDech, svgDech];

  const contentByCategory = {
    "LIVING ROOM": { bgI: "MEDIA/img/salon.webp", svgI: "MEDIA/svg/Vector 4.svg", bgD: "MEDIA/img/salon2.webp", svgD: "MEDIA/svg/Recurso 16.svg" },
    "BEDROOM": { bgI: "MEDIA/img/dormitorio.webp", svgI: "MEDIA/svg/Group 42.svg", bgD: "MEDIA/img/dormitorio2.webp", svgD: "MEDIA/svg/Recurso 14.svg" },
    "DINING ROOM": { bgI: "MEDIA/img/comedor.webp", svgI: "MEDIA/svg/Vector 5.svg", bgD: "MEDIA/img/comedor2.webp", svgD: "MEDIA/svg/Recurso 17.svg" },
    "BATHROOM": { bgI: "MEDIA/img/baño.webp", svgI: "MEDIA/svg/Vector 18.png", bgD: "MEDIA/img/baño2.webp", svgD: "MEDIA/svg/Recurso 13.svg" }
  };

  Object.values(contentByCategory).forEach(cat => {
    Object.values(cat).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });

  let currentCategory = null;

  categories.forEach(h => {
    h.addEventListener("mouseenter", () => {
      const cat = h.textContent.trim().toUpperCase();
      if (!contentByCategory[cat] || cat === currentCategory) return;

      currentCategory = cat;

      const tl = gsap.timeline();

      tl.to(allElements, {
        opacity: 0,
        y: 5, 
        duration: 0.1, 
        ease: "power1.in",
        onComplete: () => {
          bgIzq.src = contentByCategory[cat].bgI;
          svgIzq.src = contentByCategory[cat].svgI;
          bgDech.src = contentByCategory[cat].bgD;
          svgDech.src = contentByCategory[cat].svgD;
        }
      })
      .fromTo(allElements, 
        { opacity: 0, y: -5 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.25, 
          ease: "expo.out", 
          stagger: 0.02 
        }
      );
    });
  });
});

// FADE DE LOS TEXTOS 

const prepareText = () => {
  document.querySelectorAll(".texts-main, .text-muebles").forEach((el) => {
    const targets = el.querySelectorAll("p").length > 0 ? el.querySelectorAll("p") : [el];
    
    targets.forEach((target) => {
      if (target.dataset.prepared) return; 

      const words = target.innerText.split(/(\s+)/); 
      target.innerHTML = words
        .map(word => {
          if (word.trim().length === 0) return word; 
          return `<span class="scroll-word" style="opacity: 0.15; transition: opacity 1.2s ease;">${word}</span>`;
        })
        .join("");
      
      target.dataset.prepared = true;
    });
  });
};

const handleScroll = () => {
  const allWords = document.querySelectorAll(".scroll-word");
  const windowHeight = window.innerHeight;
  
  const triggerPoint = windowHeight * 0.85;

  allWords.forEach((word) => {
    const rect = word.getBoundingClientRect();
    
    if (rect.top < triggerPoint) {
      word.style.opacity = "1";
    } else {
      word.style.opacity = "0.15";
    }
  });
};

prepareText();
window.addEventListener("scroll", handleScroll);
handleScroll();