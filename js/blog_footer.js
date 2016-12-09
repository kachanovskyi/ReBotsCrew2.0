var targetOffsetHide = $('.social-share').offset().top;
var firstP = $('.content p:first-child');
var targetOffsetShow = (firstP.offset().top + firstP.height());
console.log(targetOffsetShow);

$(window).on('resize', function(){
    targetOffsetHide = $('.social-share').offset().top;
    console.log('resized');
});
// console.log(targetOffsetHide, 'targetOffset');
var $w = $(window).scroll(function(){
    if ( ($w.scrollTop() > targetOffsetShow) && (($w.scrollTop() + $w.height()) < (targetOffsetHide + $('.social-share').outerHeight())) ) {
        $('.footer-fixed').removeClass('hidden');
    } else {
        $('.footer-fixed').addClass('hidden');
    }
});
