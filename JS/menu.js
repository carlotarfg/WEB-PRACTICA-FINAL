// menu responsive 

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

mobileCartBtn?.addEventListener('click', (e) => {
  e.stopPropagation(); 
  cartPanel.classList.add('open');
});

});

// --- ocultar/mostrar menu al hacer scroll ---

(function() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  navbar.style.transition = 'transform 0.4s ease, top 0.4s ease';

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.top = '-150px'; 
    } else {
      navbar.style.top = '3%';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
})();

// --- ocultar/mostrar menu movil al hacer scroll ---

(function() {
  const mobileBar = document.querySelector('.mobile-bar');
  const mobileMenu = document.getElementById('mobileMenu');
  let lastScrollTop = 0;
  
  if (mobileBar) {
    mobileBar.style.transition = 'top 0.4s ease';
    
    window.addEventListener('scroll', () => {
      if (mobileMenu && mobileMenu.style.display === 'block') {
        return; 
      }

      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
        mobileBar.style.top = '-100px'; 
      } else {
        mobileBar.style.top = '0';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }
})();