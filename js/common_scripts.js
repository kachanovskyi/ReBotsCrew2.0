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
    //Modile navigation bar scripts

    //icon transformation
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });

    //menu height
    console.log($(window).height());
    console.log($(window).innerHeight());
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('should work only for mobile');
        toggleLandscapeNavbar();
        $( window ).on( "orientationchange", function(event) {
            toggleLandscapeNavbar();
        });
    }

    function calcMenuItemHeight() {
        $('.navbar-collapse').css('min-height', $(window).height());
        $('#navbar').css('height', $(window).height());
        $('.nav.navbar-nav').css('overflow', 'auto');
        $('.nav.navbar-nav').css('max-height', 'none');

        var itemHeight = (($(window).height() - 50) / 5);
        var paddingTop = ((itemHeight - 18) / 2);
        // console.log(paddingTop);
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
        // else if(matchMedia('(max-width:575px) and (orientation:portrait)').matches) {
        //     $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
        //         $(this).css('height', '50px');
        //         $(this).css('padding-top', '16px')
        //     })
        // } else if(matchMedia('(max-width:767px) and (orientation:portrait)').matches) {
        //     $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
        //         $(this).css('height', '60px');
        //         $(this).css('padding-top', '21px')
        //     })
        // }
    }
});
