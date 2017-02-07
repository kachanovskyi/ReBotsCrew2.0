$('a.page-scroll').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 900);
            return false;
        }
    }
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar-fixed-top').outerHeight();

$(window).scroll(function(event) {
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
        return;


    if (st > lastScrollTop && st > navbarHeight) {
        $('.navbar-fixed-top').removeClass('nav-down').addClass('nav-up');
        $('#navbar').removeClass('in');
        $(".navbar-toggle").removeClass('active');

        $("#navOverlay").css("height", "0%");
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
