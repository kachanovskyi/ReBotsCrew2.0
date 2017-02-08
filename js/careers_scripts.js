$(document).ready(function () {
    $('#roleSalesManager, #roleJavaDev').on("click", function () {
        if(matchMedia('(max-width:767px)').matches) {
            $('.modal-mobile-header').css('display', 'block');
        }
    });

    $('#modalCloseBtn').on("click", function () {
        $('#modalSalesManager, #modalJavaDev').modal('hide');
        $('.modal-mobile-header').fadeOut("fast");
    })
});
