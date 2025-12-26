const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

openMenu.addEventListener('click', () => {
  mobileMenu.style.display = 'block';

  mobileMenu.animate(
    [
      { transform: 'translateX(100%)'},
      { transform: 'translateX(0)'}
    ],
    {
      duration: 550,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards'
    }
  );
});

closeMenu.addEventListener('click', () => {
  const animation = mobileMenu.animate(
    [
      { transform: 'translateX(0)'},
      { transform: 'translateX(100%)'}
    ],
    {
      duration: 450,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards'
    }
  );

  animation.onfinish = () => {
    mobileMenu.style.display = 'none';
  };

  const mobileCartBtn = document.getElementById('mobileCart');

// Abrir carrito desde móvil
mobileCartBtn?.addEventListener('click', (e) => {
  e.stopPropagation(); // evita que se cierre por el listener global
  cartPanel.classList.add('open');
});

});
