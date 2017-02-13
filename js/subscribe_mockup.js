$(document).ready(function () {
    $('<iframe name="mock_frame" style="display: none; visibility: hidden;"></iframe>').appendTo('body');
});

var submissionCheck = function (param) {
    $('#timezoneInput').val(-(new Date().getTimezoneOffset())/60);
    if(validateEmail() && param === 'close') {
        console.log(localStorage.getItem('subscriptionBotsCrew'));
        localStorage.setItem('subscriptionBotsCrew', 1);
        customAlert("Thank You for subscription", 1);
        closeSubscribeBlock();
    }
};

function closeSubscribeBlock() {
    var subscribeBlock = $('.subscribe-block');
    subscribeBlock.animate({
        marginTop: '-=72px',
        display: 'none'
    }, { duration: 200, queue: false });
    $('body').animate({
        paddingTop: '-=72px'
    }, 200, function () {
        subscribeBlock.css('display', 'none');
    });
}
