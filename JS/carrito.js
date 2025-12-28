const cartBtnDesktop = document.getElementById('cartBtnDesktop');
const cartBtnMobile = document.getElementById('cartBtnMobile');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');

function openCart() {
  cartPanel.classList.add('open');
}

// Escuchar ambos botones
cartBtnDesktop?.addEventListener('click', openCart);
cartBtnMobile?.addEventListener('click', openCart);

// Cerrar
closeCart?.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  const clickedInsidePanel = cartPanel && cartPanel.contains(e.target);
  const clickedOnCartBtn = [cartBtnDesktop, cartBtnMobile].some(btn => btn && (e.target === btn || btn.contains(e.target)));

  if (!clickedInsidePanel && !clickedOnCartBtn) {
    cartPanel?.classList.remove('open');
  }
});
