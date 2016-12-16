var alignPricingBlocks = function () {
    if ($(window).width() > 767) {
        var centerPricingBlock = $('.slide-8 .pricing.center .block');
        var pricingBlock = $('.slide-8 .pricing .block');
        var diff = centerPricingBlock.outerHeight() - $(pricingBlock[1]).outerHeight();
        for (var i = 1; i < pricingBlock.length; i++) {
            $(pricingBlock[i]).css('margin-top', (diff / 2));
        }
    }
};

$(document).ready(function () {
    var barInitialized = false;
    var bar;
    var timer;
    var progressSlide = 0;
    var listElem = $('.slide-4 .bottom ul>li');
    var displayAmount = 0;
    for (var i = 0; i < listElem.length - 1; i++) {
        if($(listElem[i]).css('display') === 'block') {
            displayAmount++;
        }
    }

    //.bot-example scripts
    var phrases = [
        { type: 'person', phrase: '1.You dude!' },
        { type: 'bot', phrase: '2.Aloha! How can I help You?' },
        { type: 'person', phrase: '3.Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: '4.Sure! Let\'s find the best one for You' },
        { type: 'person', phrase: '5.You dude!' },
        { type: 'bot', phrase: '6.Aloha! How can I help You?' },
        { type: 'person', phrase: '7.Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: '8.Sure! Let\'s find the best one for You' }
    ];
    var messengerHeights = [];
    var current;

    for (i = 0; i < ($('.slide-4 .bottom ul>li').length - 1); i++) {
        for (var j = 0; j < phrases.length; j++) {
            var example = $($('.bot-example')[i]);
            var div = document.createElement('div');
            div.className = "phrase-box " + phrases[j].type;
            div.innerHTML = phrases[j].phrase;
            $(div).appendTo(example);
        }
    }

    var addMessages = function() {
        current = 0;
        clearTimeout(timer);

        var example = $($('.bot-example')[progressSlide]);
        var bottom = example.outerHeight();
        example.css('bottom', -bottom);

        timer = setTimeout(function message() {
            if ( ($w.scrollTop() > $('.slide-5').offset().top) ) {
                clearTimeout(timer);
            }

            var example = $($('.bot-example')[progressSlide]);
            displayOne(example.children()[current]);

            current++;
            if(current < 8) {
                timer = setTimeout(message, 2000);
            } else {
                current = 0;
            }

        }, 400);
    };

    var displayOne = function(phraseObj) {
        var example = $($('.bot-example')[progressSlide]);
        if(example.css('bottom') < "0px") {
            example.animate({
                bottom: "+=" + ($(phraseObj).outerHeight() + 10)
            }, 244);
        }
        // example.scrollTop(example[progressSlide].scrollHeight);
    };



    var progressBarInit = function () {
        // console.log('progressBar init');
        var listItem = $('.slide-4 .bottom ul>li');
        var listItemLink = $('.slide-4 .bottom ul>li>a');
        addMessages();

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $(listItem[progressSlide]).append('<div class="progressbar-container"></div>');
        listItemLink.removeClass('active');
        listItem.removeClass('active');
        $(listItemLink[progressSlide]).addClass('active');
        $($(listItemLink[progressSlide]).parent()).addClass('active');
        bar = new ProgressBar.Line('.progressbar-container', {
            strokeWidth: 1,
            duration: 16000,
            color: '#2F80ED',
            trailColor: '#DFDFDF',
            trailWidth: 6,
            svgStyle: {width: '100%', height: '100%'}
        });

        bar.animate(1.0, function() {
            var example = $('.bot-example');
            if(progressSlide < 6) {
                progressSlide++;
                $('#botUsesCard').carousel('next');
            } else {
                progressSlide = 0;
                $('.slide-4 .bottom ul>li .progressbar-container').remove();
                $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
            }
            if(progressSlide === 6) {
                progressSlide = 0;
            }
            progressBarInit();
        });
    };

    $('.slide-4 .bottom ul>li>a').click(function () {
        $('#botUsesCard').carousel(+$(this).attr('data-id'));
        var listItemLink = $('.slide-4 .bottom ul>li>a');

        listItemLink.removeClass('active');
        bar.stop();
        bar.set(0.0);
        progressSlide = listItemLink.index(this);
        progressBarInit();
    });

    var middleBotAdvantage = $('.slide-3 .bots-advantages.middle');
    var targetOffset = (middleBotAdvantage.offset().top);
    var $w = $(window).scroll(function() {
        var slide5 = $('.slide-5');
        if ( !barInitialized && ($w.scrollTop() > targetOffset) && ($w.scrollTop() < slide5.offset().top) ) {
            progressBarInit();
            barInitialized = true;
        }

        if ( barInitialized && (($w.scrollTop() > slide5.offset().top) || $w.scrollTop() < targetOffset)) {
            clearTimeout(timer);
            bar.stop();
            bar.set(0.0);
            barInitialized = false;
        }
    });


    var $rw = $(window).resize(function(){
        var listElem = $('.slide-4 .bottom ul>li');
        displayAmount = 0;
        for (var i = 0; i < listElem.length - 1; i++) {
            if($(listElem[i]).css('display') === 'block') {
                displayAmount++;
            }
        }
        var middle = $('.slide-4 .middle');
        var maxHeight = middle.height();
        if($(window).width() < 767) {
            middle.css('max-height', (maxHeight * 2));
        }

        alignPricingBlocks();
    });

    var counter = 0;
    var listScrollNext = function () {
        var listElem = $('.slide-4 .bottom ul>li');
        if($(listElem[listElem.length - 2]).css('display') == 'block') {
            counter = 0;
            for(var i = 0; i < listElem.length - 1; i ++) {
                $(listElem[i]).css('display', 'none');
                if(i < displayAmount) {
                    $(listElem[i]).css('display', 'block');
                }
            }
        } else {
            $(listElem[counter]).css('display', 'none');
            $(listElem[counter + displayAmount]).css('display', 'block');
            counter++;
        }
    };
    $('#listScrollNext').click(function (e) {
        listScrollNext();
        return false;
    });

    alignPricingBlocks();
    autosize($('textarea'));
});
