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

// --- Lógica para ocultar/mostrar Navbar al hacer scroll ---

(function() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  // Aplicamos la transición por JS para no tocar tu CSS
  navbar.style.transition = 'transform 0.4s ease, top 0.4s ease';

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Al bajar: movemos la barra hacia arriba ocultándola
      // Usamos -150% para asegurar que salga del todo sin importar el padding
      navbar.style.top = '-150px'; 
    } else {
      // Al subir: restauramos su posición original definida en tu CSS
      navbar.style.top = '3%';
    }
    
    // Evitamos valores negativos en el scroll (común en iOS)
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
})();