$(document).ready(function () {
    $(window).resize(function () {
        if(matchMedia('(max-width:767px)').matches && $("#modalSalesManager").data('bs.modal').isShown) {
            $('.modal-mobile-header').css('display', 'block');
        } else {
            $('.modal-mobile-header').css('display', 'none');
        }
    });

    $('#roleSalesManager').on("click", function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.open("careers/sales.html");
        } else {
            $('#modalSalesManager').modal('show');
            autosize($('textarea'));
        }
    });
    $('#roleJavaDev').on("click", function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.open("careers/java-junior.html");
        } else {
            $('#modalJavaDev').modal('show');
            autosize($('textarea'));
        }
    });

    $('#roleSalesManager, #roleJavaDev').on("click", function () {
        if(matchMedia('(max-width:767px)').matches) {
            $('.modal-mobile-header').css('display', 'block');
        }
    });
    $('#modalCloseBtn').on("click", function () {
        $('#modalSalesManager, #modalJavaDev').modal('hide');
        $('.modal-mobile-header').fadeOut("fast");
    });
    $('#modalSalesManager, #modalJavaDev').on('hidden.bs.modal', function() {
        $('.modal-mobile-header').css('display', 'none');
    });
});
