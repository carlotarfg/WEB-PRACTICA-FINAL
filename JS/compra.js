// ___ CLICKAR IMG Y QUE SALGAN OPCIONES ___

$(document).ready(function () {

  $(".tab").on("click", function () {

    const category = $(this).data("category");

    $(".tab").removeClass("active");
    $(".category").removeClass("active");

    $(this).addClass("active");
    $(".category." + category).addClass("active");

    if (category === "paypal") {
      window.location.href = "https://www.paypal.com/checkoutnow?token=65U984472L9049229";
    }

  });

});
