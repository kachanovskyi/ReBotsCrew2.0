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
    var counter = 1;
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
    var current;

    for (i = 1; i < ($('.slide-4 .bottom ul>li').length - 1); i++) {
        for (var j = 0; j < phrases.length; j++) {
            // console.log('bot-example should have number ' + (i-1));
            var example = $($('.bot-example')[i - 1]);
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
        // console.log(example, progressSlide);
        for (var i = 0; i < phrases.length; i++) {
            $(example.children()[i]).css('visibility', 'visible');
        }
        example.css('visibility', 'visible');
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
        // console.log($('.bot-example-wrapper').offset().top);
        var example = $($('.bot-example')[progressSlide]);
        if(example.css('bottom') < "0px") {
            example.animate({
                bottom: "+=" + ($(phraseObj).outerHeight() + 10)
            }, 244, function () {
                for (var i = 0; i < phrases.length; i++) {
                    if ($(example.children()[i]).offset().top <= $($('.bot-example-wrapper')[progressSlide]).offset().top) {
                        $(example.children()[i]).css('visibility', 'hidden');
                    }
                }
            });
        }
        // example.scrollTop(example[progressSlide].scrollHeight);
    };



    var progressBarInit = function () {
        // console.log('progressBar init ' + progressSlide);
        var listItem = $('.slide-4 .bottom ul>li');
        var listItemLink = $('.slide-4 .bottom ul>li>a');
        addMessages();

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $(listItem[counter]).append('<div class="progressbar-container"></div>');
        listItemLink.removeClass('active');
        listItem.removeClass('active');
        $(listItemLink[counter]).addClass('active');
        $($(listItemLink[counter]).parent()).addClass('active');
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
            if(counter < 7) {
                counter++;
                progressSlide = counter - 1;
                $('#botUsesCard').carousel('next');
            } else {
                counter = 1;
                progressSlide = counter - 1;
                $('.slide-4 .bottom ul>li .progressbar-container').remove();
                $(listItem[counter]).append('<div class="progressbar-container"></div>');
            }
            if(counter === 7) {
                counter = 1;
                progressSlide = counter - 1;
            }
            // if($(listItem[progressSlide]).css('display') !== 'block') {
            //     // console.log('block called');
            //     listScroll("next");
            // }
            listScroll("next");
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
        counter = (listItemLink.index(this));
        progressSlide = counter - 1;
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

    var listScroll = function (param) {
        var i;
        var listElem = $('.slide-4 .bottom ul>li');
        if(param == "next") {
            counter++;
            console.log('this is counter ', counter);
            if(counter > 6) {
                counter = 1;
                console.log('counter = 1!!!');
            }
            progressSlide = counter - 1;
            $('#botUsesCard').carousel(progressSlide);

            if($(listElem[counter]).css('display') == 'none') {
                for(i = 1; i < listElem.length - 1; i++) {
                    $(listElem[i]).css('display', 'none');
                }
                for(i = counter; i < (counter + displayAmount);i++) {
                    $(listElem[i]).css('display', 'block');
                }
            }
            bar.stop();
            bar.set(0.0);
            progressBarInit();

            // if($(listElem[listElem.length - 2]).css('display') == 'block') {
            //     // console.log('1.counter', counter);
            //     progressSlide = counter = 1;
            //     $('#botUsesCard').carousel(progressSlide);
            //     for(var i = 1; i < listElem.length - 1; i++) {
            //         $(listElem[i]).css('display', 'none');
            //         if(i <= displayAmount) {
            //             $(listElem[i]).css('display', 'block');
            //         }
            //     }
            //     bar.stop();
            //     bar.set(0.0);
            //     progressBarInit();
            // } else {
            //     // console.log('2.counter', counter);
            //     $(listElem[counter]).css('display', 'none');
            //     $(listElem[counter + displayAmount]).css('display', 'block');
            //     counter++;
            //
            //     for (i = 1; i < listElem.length; i++) {
            //         if($(listElem[i]).css('display') == 'block') {
            //             progressSlide = i;
            //             $('#botUsesCard').carousel(progressSlide-1);
            //             bar.stop();
            //             bar.set(0.0);
            //             progressBarInit();
            //             break;
            //         }
            //     }
            // }
        } else {
            counter--;
            console.log('this is counter ', counter);
            if(counter < 1) {
                counter = 6;
                console.log('counter = 6!!!');
            }
            progressSlide = counter - 1;
            $('#botUsesCard').carousel(progressSlide);

            if($(listElem[counter]).css('display') == 'none') {
                for(i = 1; i < listElem.length - 1; i++) {
                    $(listElem[i]).css('display', 'none');
                }
                for(i = counter - displayAmount + 1; i < (counter + 1); i++) {
                    $(listElem[i]).css('display', 'block');
                }
            }
            bar.stop();
            bar.set(0.0);
            progressBarInit();
            // if($(listElem[1]).css('display') == 'block') {
            //     var displayedAmount = 0;
            //     // console.log('if case');
            //     // console.log(listElem[1]);
            //     counter = (listElem.length - 2);
            //     progressSlide = counter;
            //     // console.log('3.counter', counter);
            //     // console.log(progressSlide, 'progressSlide');
            //     $('#botUsesCard').carousel(progressSlide-1);
            //     for(i = listElem.length - 2; i > 0 ; i--) {
            //         if(displayedAmount < displayAmount) {
            //             $(listElem[i]).css('display', 'block');
            //             displayedAmount++;
            //         } else {
            //             $(listElem[i]).css('display', 'none');
            //         }
            //     }
            //     bar.stop();
            //     bar.set(0.0);
            //     progressBarInit();
            // } else {
            //     // console.log('progressSlide_1_' + progressSlide);
            //     // console.log('4.counter', counter);
            //     $(listElem[counter]).css('display', 'none');
            //     $(listElem[counter - displayAmount]).css('display', 'block');
            //     counter--;
            //
            //     for (i = listElem.length - 2; i > 0 ; i--) {
            //         if($(listElem[i]).css('display') == 'block') {
            //             progressSlide = i;
            //             $('#botUsesCard').carousel(progressSlide-1);
            //             // console.log(progressSlide);
            //             bar.stop();
            //             bar.set(0.0);
            //             progressBarInit();
            //             break;
            //         }
            //     }
            // }
        }
    };

    $('#listScrollPrev').click(function (e) {
        listScroll("prev");
        return false;
    });
    $('#listScrollNext').click(function (e) {
        listScroll("next");
        return false;
    });

    alignPricingBlocks();
    autosize($('textarea'));
});
