$(document).ready(function () {
  const animationDuration = 0.4; // segundos

  $(".tab").on("click", function () {
    const category = $(this).data("category");
    const $categoryDiv = $(".category." + category);

    // Si la categoría ya está activa → cerrarla
    if ($categoryDiv.hasClass("active")) {
      gsap.to($categoryDiv, {
        height: 0,
        autoAlpha: 0,
        duration: animationDuration,
        ease: "power2.inOut",
        onComplete: () => $categoryDiv.removeClass("active")
      });
      $(this).removeClass("active");
      return;
    }

    // Cerrar cualquier otra categoría abierta
    $(".tab").removeClass("active");
    $(".category.active").each(function () {
      gsap.to(this, {
        height: 0,
        autoAlpha: 0,
        duration: animationDuration,
        ease: "power2.inOut",
        onComplete: () => $(this).removeClass("active")
      });
    });

    // Abrir la nueva categoría
    $(this).addClass("active");
    $categoryDiv.addClass("active");

    // Calcular altura automática
    let autoHeight = $categoryDiv.css("height", "auto").height();
    $categoryDiv.height(0);

    gsap.to($categoryDiv, {
      height: autoHeight,
      autoAlpha: 1,
      duration: animationDuration,
      ease: "power2.inOut"
    });

    // Redirigir si es PayPal
    if (category === "paypal") {
      setTimeout(() => {
        window.location.href = "https://www.paypal.com/checkoutnow?token=65U984472L9049229";
      }, animationDuration * 1000);
    }
  });
});


// document.addEventListener('DOMContentLoaded', () => {
//   const finalizeBtn = document.querySelector('.btn-primary');

//   finalizeBtn?.addEventListener('click', (e) => {
//     e.preventDefault();

//     // Obtener productos del carrito
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//     if(cartItems.length === 0){
//       alert("Tu carrito está vacío. Añade productos antes de finalizar.");
//       return;
//     }

//     // Guardar carrito para página de éxito
//     sessionStorage.setItem('checkoutCart', JSON.stringify(cartItems));

//     // Limpiar carrito si quieres resetearlo al finalizar
//     localStorage.removeItem('cartItems');

//     // Redirigir a la página de éxito
//     window.location.href = "checkout-success.html";
//   });
// });
