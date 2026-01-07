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


document.addEventListener("DOMContentLoaded", () => {

  // Evitar animaciones en móvil
  if (window.innerWidth < 991) return;

  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power3.out"
    }
  });

  // Columna izquierda (productos)
  tl.from(".checkout-left", {
    x: -80,
    opacity: 0
  })

  // Productos con pequeño stagger
  .from(".checkout-product", {
    x: -40,
    opacity: 0,
    stagger: 0.15
  }, "-=0.4")

  // Total y botones
  .from(".product-total, .checkout-finalizar", {
    y: 40,
    opacity: 0
  }, "-=0.3")

  // Columna derecha (formulario)
  .from(".checkout-right", {
    x: 80,
    opacity: 0
  }, "-=0.8")

  // Inputs del formulario
  .from(".checkout-form .input-group", {
    y: 30,
    opacity: 0,
    stagger: 0.08
  }, "-=0.4")

  // Métodos de pago
  .from(".tabs .tab", {
    scale: 0.9,
    opacity: 0,
    stagger: 0.1
  }, "-=0.3");

});

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el contenedor del total y los botones de eliminar
    const totalContainer = document.querySelector('.product-total strong');
    const deleteButtons = document.querySelectorAll('.delete-item-compra');

    /**
     * Función para calcular y actualizar el total en el DOM
     */
    const calcularTotal = () => {
        const precios = document.querySelectorAll('.product-info .price');
        let total = 0;

        precios.forEach(precioElemento => {
            // Limpiamos el texto: quitamos '€', espacios y cambiamos ',' por '.'
            let precioTexto = precioElemento.textContent
                .replace('€', '')
                .replace('.', '') // Quita puntos de miles si los hubiera
                .replace(',', '.')
                .trim();
            
            total += parseFloat(precioTexto) || 0;
        });

        // Actualizamos el texto del total con formato local (español)
        if (totalContainer) {
            totalContainer.textContent = total.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + ' €';
        }
    };

    /**
     * Evento para eliminar productos
     */
    // Usamos delegación de eventos para que funcione incluso si el DOM cambia
    document.addEventListener('click', (event) => {
        const btn = event.target.closest('.delete-item-compra');
        
        if (btn) {
            // Buscamos el contenedor principal del producto (section)
            const productSection = btn.closest('.checkout-product');
            
            if (productSection) {
                // Eliminamos el elemento del HTML
                productSection.remove();
                
                // Recalculamos el total inmediatamente
                calcularTotal();
            }
        }
    });

    // Ejecutamos el cálculo inicial por si los precios vienen de base de datos
    calcularTotal();
});