var targetOffset = $('.content').offset().top - 60;
$(window).on('resize', function(){
    targetOffset = $('.content').offset().top - 60;
}());
var $w = $(window).scroll(function(){
    console.log(targetOffset, 'targetOffset');

    if ( $w.scrollTop() > (targetOffset)) {
        console.log('header styles updated');
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('border-white');
        $('.header .menu-item.bot-btn').addClass('text-blue');
        $('.logo').attr('src', "img/logo.svg");
        $('.icon-bar').removeClass('white');
    } else {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('text-blue');
        $('.header .menu-item.bot-btn').addClass('border-white');
        $('.logo').attr('src', "img/logo_white.svg");
        $('.icon-bar').addClass('white');
    }

    if ( $w.scrollTop() > targetOffset) {
        $('.navbar-default').css('border-bottom', '1px solid #E5E5E5');
        $('.navbar').css('background', '#FFFFFF');
    } else {
        $('.navbar-default').css('border-bottom', 'none');
        $('.navbar').css('background', 'transparent');
    }
});
