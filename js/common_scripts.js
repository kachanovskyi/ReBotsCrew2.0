var validateEmail = function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test($('#emailInput').val())) {
        customAlert("Please provide correct e-mail", 2);
        return false;
    }
    return true;
};

var customAlert = function (text, type) {
    var alert = $('<div class="alert" role="alert">')
        .append(
            $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
        );

    if(type === 1) {
        alert
            .addClass('alert-success')
            .append(
                $('<p>')
                    .append($('<strong>Success! </strong>'))
                    .append(text + " ")
                    .append($('<i class="twa twa-heart-eyes"></i>'))
            )
    } else {
        alert
            .addClass('alert-warning')
            .append(
                $('<p>')
                    .append($('<strong>Oh! </strong>'))
                    .append(text + " ")
                    .append($('<i class="twa twa-confused"></i>'))
            )
    }
    alert.appendTo('#wrapper');

    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
        });
    }, 3000);
};

//mobile navbar background overlay
function toggleNavOverlay() {
    if(document.getElementById("navOverlay").style.height === '100%') {
        document.getElementById('toggleNavBtn').style.pointerEvents = 'none';
        document.getElementById("navOverlay").style.height = "0%";
        $('.navbar-collapse').on('hidden.bs.collapse', function() {
            document.getElementById('toggleNavBtn').style.pointerEvents = 'auto';
        });
    } else {
        document.getElementById('toggleNavBtn').style.pointerEvents = 'none';
        document.getElementById("navOverlay").style.height = "100%";
        $('.navbar-collapse').on('shown.bs.collapse', function() {
            document.getElementById('toggleNavBtn').style.pointerEvents = 'auto';
        });
    }
}

$(document).ready(function () {
    $('form').submit(function(){
        $('input[required]').css("border-color", "red");
        $('input[required="true"]').css("border-color", "blue");
        $('input[required="required"]').css("border-color", "green");
        $('input:required').css("border-color", "yello");
        var required = $('#emailInput'); // change to [required] if not using true option as part of the attribute as it is not really needed.
        var error = false;

        console.log($('input[required]'));

        for(var i = 0; i <= (required.length - 1);i++)
        {
            if(required[i].value == '') // tests that each required value does not equal blank, you could put in more stringent checks here if you wish.
            {
                required[i].style.borderColor = 'rgb(255,155,155)';
                $('.bot-btn.white.subscribe')[0].style.borderColor = 'rgb(255,155,155)'
                $('.bot-btn.white.subscribe')[0].style.opacity = '1';
                error = true; // if any inputs fail validation then the error variable will be set to true;
            }
        }

        if(error) // if error is true;
        {
            return false; // stop the form from being submitted.
        }
    });
    //Modile navigation bar scripts

    //icon transformation
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });

    //menu height
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('should work only for mobile');
        toggleLandscapeNavbar();
        $( window ).on( "orientationchange", function(event) {
            toggleLandscapeNavbar();
        });
    }

    function calcMenuItemHeight() {
        $('.navbar-collapse').css('max-height', $(window).height());
        $('#navbar').css('height', $(window).height());
        $('.nav.navbar-nav').css('overflow', 'visible');
        $('.nav.navbar-nav').css('max-height', 'none');

        var itemHeight = (($(window).height() - 50) / 5);
        // console.log(paddingTop);
        if(matchMedia('(orientation: landscape)').matches) {
            itemHeight = (($(window).height() - 100) / 5)
        }
        var paddingTop = ((itemHeight - 18) / 2);

        $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
            $(this).css('height', itemHeight);
            $(this).css('padding-top', paddingTop)
        })
    }

    function toggleLandscapeNavbar() {
        if(matchMedia('(max-width:767px)').matches) {
            calcMenuItemHeight();
            $(window).on("resize", function () {
                calcMenuItemHeight();
                console.log('menu items heights recalculated');
            })
        }
        // else if(matchMedia('(max-width:767px)').matches) {
        //     $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
        //         $(this).css('height', '50px');
        //         $(this).css('padding-top', '16px');
        //     })
        // }
        // else if(matchMedia('(max-width:767px)').matches) {
        //     $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
        //         $(this).css('height', '60px');
        //         $(this).css('padding-top', '21px')
        //     })
        // }
    }
});
