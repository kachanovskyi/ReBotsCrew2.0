var subFolder = false,
    root = 'img/';

if($('#subFolderScript')[0]) {
    subFolder = true;
    root = '../img/';
}

var targetOffset = $('.content').offset().top - 60;
$(window).on('resize', function(){
    targetOffset = $('.content').offset().top - 60;
}());

function styleNavbar(){

    if ( $w.scrollTop() > (targetOffset)) {
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('border-white');
        $('.header .menu-item.bot-btn').addClass('text-blue');
        $('.logo').attr('src', root + "logo.svg");
        $('.icon-bar').removeClass('white');
    } else {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('text-blue');
        $('.header .menu-item.bot-btn').addClass('border-white');
        $('.logo').attr('src', root + "logo_white.svg");
        $('.icon-bar').addClass('white');
    }

    if ( $w.scrollTop() > targetOffset) {
        $('.navbar-default').css('border-bottom', '1px solid #E5E5E5');
        $('.navbar').css('background', '#FFFFFF');
    } else {
        // $('.navbar-default').css('border-bottom', 'none');
        $('.navbar').css('background', 'rgba(0, 0, 0, .5)');
    }
}

var $w = $(window).scroll(styleNavbar);

var menuDefaultStyles = function () {
    if($('#navbar').hasClass('collapse in')) {
        // if($('.navbar-toggle').hasClass('active')) {
        //     $('.navbar-toggle').removeClass('active');
        // }
        styleNavbar();
    } else {
        // $('.navbar-toggle').addClass('active');
        $('.navbar').css('background', '#FFFFFF');
        $('.navbar').css('background', '#FFFFFF');
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('border-white');
        $('.header .menu-item.bot-btn').addClass('text-blue');
        $('.logo').attr('src', root + "logo.svg");
        $('.icon-bar').removeClass('white');
    }
};

$(document).ready(function () {
    $('#navbar').on('hidden.bs.collapse', function () {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('text-blue');
        $('.header .menu-item.bot-btn').addClass('border-white');
        $('.logo').attr('src', root + "logo_white.svg");
        $('.icon-bar').addClass('white');
        $('.navbar').css('background', 'rgba(0, 0, 0, .5)');
    })
});
