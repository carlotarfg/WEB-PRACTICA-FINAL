const cartBtn = document.getElementById('cartBtn');
    const cartPanel = document.getElementById('cartPanel');
    const closeCart = document.getElementById('closeCart');

    cartBtn.addEventListener('click', () => {
      cartPanel.classList.add('open');
    });

    closeCart.addEventListener('click', () => {
      cartPanel.classList.remove('open');
    });

    // Cerrar carrito si se hace clic fuera
    document.addEventListener('click', (e) => {
      if (!cartPanel.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
        cartPanel.classList.remove('open');
      }
    });