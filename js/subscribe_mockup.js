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

$('#subscribe-form').submit(function(){
    // $('input[required]').css("border-color", "red");
    $('input[required="true"]').css("border-color", "blue");
    $('input[required="required"]').css("border-color", "green");
    $('input:required').css("border-color", "yello");
    var required = $('#emailInput'); // change to [required] if not using true option as part of the attribute as it is not really needed.
    var error = false;

    for(var i = 0; i <= (required.length - 1);i++)
    {
        if(required[i].value == '') // tests that each required value does not equal blank, you could put in more stringent checks here if you wish.
        {
            required[i].style.borderColor = 'rgb(255,155,155)';
            $('.bot-btn.white.subscribe')[0].style.borderColor = 'rgb(255,155,155)';
            $('.bot-btn.white.subscribe')[0].style.opacity = '1';
            error = true; // if any inputs fail validation then the error variable will be set to true;
        }
    }

    if(error) // if error is true;
    {
        return false; // stop the form from being submitted.
    }
});
