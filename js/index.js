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
    var progressSlide = 1;
    var listElem = $('.slide-4 .bottom ul>li');
    var displayAmount = 0;
    for (var i = 1; i < listElem.length - 1; i++) {
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
    // var messengerHeights = [];
    var current;

    for (i = 1; i < ($('.slide-4 .bottom ul>li').length - 1); i++) {
        for (var j = 0; j < phrases.length; j++) {
            console.log('bot-example should have number ' + (i-1));
            var example = $($('.bot-example')[i - 1]);
            var div = document.createElement('div');
            div.className = "phrase-box " + phrases[j].type;
            div.innerHTML = phrases[j].phrase;
            $(div).appendTo(example);
        }
    }

    var addMessages = function() {
        var counter;
        current = 0;
        clearTimeout(timer);

        var example = $($('.bot-example')[progressSlide-1]);
        console.log(example, progressSlide);
        for (counter = 0; counter < phrases.length; counter++) {
            $(example.children()[counter]).css('visibility', 'visible');
        }
        example.css('visibility', 'visible');
        var bottom = example.outerHeight();
        example.css('bottom', -bottom);

        timer = setTimeout(function message() {
            if ( ($w.scrollTop() > $('.slide-5').offset().top) ) {
                clearTimeout(timer);
            }

            var example = $($('.bot-example')[progressSlide-1]);
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
        // console.log($('.bot-example-wrapper').offset().top);
        var example = $($('.bot-example')[progressSlide-1]);
        if(example.css('bottom') < "0px") {
            example.animate({
                bottom: "+=" + ($(phraseObj).outerHeight() + 10)
            }, 244, function () {
                for (var counter = 0; counter < phrases.length; counter++) {
                    if ($(example.children()[counter]).offset().top <= $($('.bot-example-wrapper')[progressSlide-1]).offset().top) {
                        $(example.children()[counter]).css('visibility', 'hidden');
                    }
                }
            });
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
            var listItem = $('.slide-4 .bottom ul>li');
            // var example = $('.bot-example');
            if(progressSlide < 7) {
                progressSlide++;
                $('#botUsesCard').carousel('next');
            } else {
                progressSlide = 1;
                $('.slide-4 .bottom ul>li .progressbar-container').remove();
                $(listItem[progressSlide]).append('<div class="progressbar-container"></div>');
            }
            if(progressSlide === 7) {
                progressSlide = 1;
            }
            if($(listItem[progressSlide]).css('display') !== 'block') {
                // console.log('block called');
                listScrollNext();
            }
            progressBarInit();
        });
    };

    $('.slide-4 .bottom ul>li>a').click(function (e) {
        $('#botUsesCard').carousel(+$(this).attr('data-id'));
        var listItemLink = $('.slide-4 .bottom ul>li>a');

        console.log(progressSlide);
        listItemLink.removeClass('active');
        bar.stop();
        bar.set(0.0);
        progressSlide = (listItemLink.index(this));
        console.log(progressSlide);
        progressBarInit();

        return false;
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
        for (var i = 1; i < listElem.length - 1; i++) {
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

    var counter = 1;
    var listScrollNext = function () {
        var listElem = $('.slide-4 .bottom ul>li');
        if($(listElem[listElem.length - 2]).css('display') == 'block') {
            progressSlide = counter = 1;
            for(var i = 1; i < listElem.length - 1; i++) {
                $(listElem[i]).css('display', 'none');
                if(i <= displayAmount) {
                    $(listElem[i]).css('display', 'block');
                }
            }
            bar.stop();
            bar.set(0.0);
            progressBarInit();
        } else {
            $(listElem[counter]).css('display', 'none');
            $(listElem[counter + displayAmount]).css('display', 'block');
            counter++;

            for (i = 1; i < listElem.length; i++) {
                if($(listElem[i]).css('display') == 'block') {
                    // console.log('progress bar activated');
                    if(progressSlide < i) {
                        progressSlide = i;
                    }
                    bar.stop();
                    bar.set(0.0);
                    progressBarInit();
                    break;
                }
            }
        }
    };
    $('#listScrollNext').click(function (e) {
        listScrollNext();
        return false;
    });

    alignPricingBlocks();
    autosize($('textarea'));
});
