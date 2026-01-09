const accordions = document.querySelectorAll('.accordion');

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    acc.classList.toggle('open');
  });
});

let quantity = 1;

const qty = document.getElementById('qty');
document.getElementById('plus').addEventListener('click', () => {
  quantity++;
  qty.textContent = quantity;
});

document.getElementById('minus').addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    qty.textContent = quantity;
  }
});

const accordionButtons = document.querySelectorAll('.accordion');

accordionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
  });
});

// carrito boton 
const addToCartBtn = document.querySelector('.add-to-cart');

addToCartBtn.addEventListener('click', () => {
  const quantity = document.getElementById('qty').textContent;
  const img = document.getElementById('product-img').src;

  console.log('Añadido al carrito:', {
    producto: 'Nixon',
    cantidad: quantity,
    imagen: img
  });
});


// acordeon 
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const btn = item.querySelector('.accordion-btn');
  const content = item.querySelector('.accordion-content');

  btn.addEventListener('click', () => {
    content.style.display =
      content.style.display === 'block' ? 'none' : 'block';
  });
});

const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});


// modelo 

gsap.from("model-viewer", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".product-info", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  delay: 0.2,
  ease: "power3.out"
});

// galeria 
gsap.utils.toArray(".photo-gallery img").forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 85%",
    },
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  });
});
