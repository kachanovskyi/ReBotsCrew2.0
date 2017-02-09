$(document).ready(function () {
    $('<iframe name="mock_frame" style="display: none; visibility: hidden;"></iframe>').appendTo('body');
    console.log('worked mockup');
});

var validateEmail = function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($('#emailInput').val());
};

var submissionCheck = function (param) {
    $('#timezoneInput').val(-(new Date().getTimezoneOffset())/60);
    if(validateEmail() && param === 'close') {
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
