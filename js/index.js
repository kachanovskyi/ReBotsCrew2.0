var evenPricingHeights = function () {
    var pricingBlock = $('.slide-8 .pricing .block .middle-subblock p');
    $(pricingBlock[2]).height($(pricingBlock[1]).height());
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

    var current;
    var addMessages = function() {
        console.log(progressSlide);
        current = 0;
        clearTimeout(timer);
        for (var index = 0; index < phrases.length; index++) {
            var example = $($('.bot-example')[progressSlide]);
            var div = document.createElement('div');
            div.className = "phrase-box " + phrases[index].type;
            div.innerHTML = phrases[index].phrase;
            $(div).appendTo(example);
        }

        var example = $($('.bot-example')[progressSlide]);
        var bottom = example.outerHeight();
        example.css('bottom', -bottom);
        console.log(bottom, 'bottom');
        console.log(example);
        console.log(example.css('bottom'));
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
        console.log('progressBar init');
        var listItem = $('.slide-4 .bottom ul>li');
        var listItemLink = $('.slide-4 .bottom ul>li>a');
        addMessages();

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
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
            // example.children().remove();
            progressBarInit();
        });
    };

    $('.slide-4 .bottom ul>li>a').click(function () {
        var item = $('#botUsesCard .item');
        var listItemLink = $('.slide-4 .bottom ul>li>a');

        $(listItemLink.parent()).removeClass('active');
        listItemLink.removeClass('active');
        $(this).addClass('active');
        $($(this).parent()).addClass('active');
        bar.stop();
        bar.set(0.0);
        // $('.bot-example').children().remove();
        progressSlide = listItemLink.index(this);

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
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
            // $($('.bot-example')[progressSlide]).children().remove();
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

        //pricing blocks height scripts
        evenPricingHeights();
    });

    var counter = 0;
    var listScrollNext = function () {
        var listElem = $('.slide-4 .bottom ul>li');
        if($(listElem[listElem.length - 2]).css('display') == 'block') {
            counter = 0;
            for(var i = 0; i < listElem.length - 1; i ++) {
                $(listElem[i]).css('display', 'none');
                // console.log($(listElem[listElem.length - 2]).css('display'), 'loop ' + i);
                if(i < displayAmount) {
                    // console.log(displayAmount, 'i < displayAmount');
                    $(listElem[i]).css('display', 'block');
                    // console.log($(listElem[i]).css('display'), 'reloading');
                }
            }
        } else {
            $(listElem[counter]).css('display', 'none');
            // console.log($(listElem[counter]).css('display'), 'display counter');
            $(listElem[counter + displayAmount]).css('display', 'block');
            // console.log($(listElem[counter + displayAmount]).css('display'), 'display counter+2');
            counter++;
        }
    };
    $('#listScrollNext').click(function (e) {
        listScrollNext();
        return false;
    });

    evenPricingHeights();
    autosize($('textarea'));
});
