$(document).ready(function () {

  $(".tab").on("click", function () {

    const category = $(this).data("category");
    const $categoryDiv = $(".category." + category);

    // SI LA ACTIVAS SALEN LAS OPCIONES
    if ($categoryDiv.hasClass("active")) {
      $categoryDiv.removeClass("active");
      $(this).removeClass("active");
      return;
    }

    // SI VUELVES A CLIKAR LA IMG SE OCULTA DE NUEVO 
    $(".tab").removeClass("active");
    $(".category").removeClass("active");

    $(this).addClass("active");
    $categoryDiv.addClass("active");

    if (category === "paypal") {
      window.location.href = "https://www.paypal.com/checkoutnow?token=65U984472L9049229";
    }

  });

});
