$(document).ready(function () {
    console.log($(window).height());
    console.log($(window).innerHeight());
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $( window ).on( "orientationchange", function(event) {
            alert('You entered ' + event.orientation + ' mode');
            if(matchMedia('all and (orientation:landscape)').matches) {
                calcMenuItemHeight();
                $(window).on("resize", function () {
                    calcMenuItemHeight()
                })
            } else if(matchMedia('(max-width:575px) and (orientation:portrait)').matches) {
                $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
                    $(this).css('height', '50px');
                    $(this).css('padding-top', '16px')
                })
            } else if(matchMedia('(max-width:767px) and (orientation:portrait)').matches) {
                $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
                    $(this).css('height', '60px');
                    $(this).css('padding-top', '21px')
                })
            }
        });
    }

    function calcMenuItemHeight() {
        $('.navbar-collapse').css('min-height', $(window).height());
        $('#navbar').css('height', $(window).height());
        $('.nav.navbar-nav').css('overflow', 'visible');
        $('.nav.navbar-nav').css('max-height', 'none');

        var itemHeight = (($(window).height() - 50) / 5);
        var paddingTop = ((itemHeight - 18) / 2);
        // console.log(paddingTop);
        $('.nav.navbar-nav.navbar-right>li>a.menu-item').each(function () {
            $(this).css('height', itemHeight);
            $(this).css('padding-top', paddingTop)
        })
    }
});
