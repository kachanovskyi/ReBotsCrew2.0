var targetOffset = $('.content').offset().top;
$(window).on('resize', function(){
    var targetOffset = $('.content').offset().top;
}());
console.log(targetOffset, 'targetOffset');
var $w = $(window).scroll(function(){
    if ( $w.scrollTop() > (targetOffset - 44*2)) {
        console.log('header styles updated');
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white');
        $('.header .menu-item.bot-btn').addClass('white-blue');
        $('.logo').attr('src', "img/logo.svg");
        $('.icon-bar').removeClass('white');
    } else {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white-blue');
        $('.header .menu-item.bot-btn').addClass('white');
        $('.logo').attr('src', "img/logo_white.svg");
        $('.icon-bar').addClass('white');
    }

    if ( $w.scrollTop() > targetOffset - 66) {
        $('.navbar-default').css('border-bottom', '1px solid #E5E5E5');
        $('.navbar').css('background', '#FFFFFF');
    } else {
        $('.navbar-default').css('border-bottom', 'none');
        $('.navbar').css('background', 'transparent');
    }
});
