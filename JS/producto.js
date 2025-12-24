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

// const productImg = document.getElementById('product-img');
// const colors = document.querySelectorAll('.color');

// colors.forEach(color => {
//   color.addEventListener('click', () => {
//     productImg.src = color.dataset.img;
//   });
// });

const accordionButtons = document.querySelectorAll('.accordion');

accordionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    // aquí luego conectas contenido real
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

    // Si quieres que solo un acordeón esté abierto a la vez:
    // document.querySelectorAll('.accordion-item').forEach(i => i !== item ? i.classList.remove('active') : null);

    item.classList.toggle("active");
  });
});

