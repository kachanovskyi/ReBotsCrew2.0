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
var alignMessengerTextHeight = function () {
    var textElem = $('.slide-4 p');
    var maxHeight = $(textElem).height();
    for (var i = 0; i < textElem.length; i++) {
        if($(textElem[i]).height() > maxHeight) {
            maxHeight = $(textElem[i]).height();
        }
    }
    for (i = 0; i < textElem.length; i++) {
        $(textElem[i]).height(maxHeight);
    }
};

var getScrollBarWidth = function () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
};

var initBarObj = function () {
    return new ProgressBar.Line('.progressbar-container', {
        strokeWidth: 1,
        duration: 16000,
        color: '#2F80ED',
        trailColor: '#DFDFDF',
        trailWidth: 6,
        svgStyle: {width: '100%', height: '100%'}
    });
};

$(document).ready(function () {
    var figure = $(".video").hover(hoverVideo, hideVideo);
    var figure1 = $(".video").click(hoverVideo);

    function hoverVideo(e) {
        $('video', this).get(0).play();
    }

    function hideVideo(e) {
        $('video', this).get(0).pause();
    }

    $("video").prop('muted', true);


    var barInitialized = false;
    var bar;
    var timer;
    var progressSlide = 0;
    var counter = 1;
    var listElem = $('.slide-4 .bottom ul>li');
    var botCarousel = $('#botUsesCard');
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

    for (i = 1; i < (listElem.length - 1); i++) {
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
        var listItem = $('.slide-4 .bottom ul>li');
        var listItemLink = $('.slide-4 .bottom ul>li>a');
        addMessages();

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $(listItem[counter]).append('<div class="progressbar-container"></div>');
        listItemLink.removeClass('active');
        listItem.removeClass('active');
        $(listItemLink[counter - 1]).addClass('active');
        $($(listItem[counter])).addClass('active');
        if(bar) {
            bar.stop();
            bar.set(0.0);
        }
        bar = initBarObj();

        bar.animate(1.0, function() {
            listScroll("next");
            progressBarInit();
        });
    };

    $('.slide-4 .bottom ul>li>a').click(function (e) {
        $('#botUsesCard').carousel(+$(this).attr('data-id'));
        var listItemLink = $('.slide-4 .bottom ul>li>a');

        console.log(progressSlide);
        listItemLink.removeClass('active');
        counter = (listItemLink.index(this) + 1);
        progressSlide = counter - 1;

        progressBarInit();

        return false;
    });

    $('.bottom-list-item').click(function (e) {
        if($(this).attr('id') === 'listSrollPrev') {
            console.log('button previous clicked');
            return;
        }
        $($(this).find('a')).trigger("click");
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

    var messengerListResize = function () {
        var listElem = $('.slide-4 .bottom ul>li');
        var windowWidth = $(window).width();
        var scrollBarWidth = getScrollBarWidth();

        $(listElem[0]).css('display', 'block');
        $(listElem[listElem.length - 1]).css('display', 'block');

        if(windowWidth <= (379 - scrollBarWidth)) {
            displayAmount = 1;
        } else if(windowWidth <= (575 - scrollBarWidth)) {
            displayAmount = 2;
        } else if(windowWidth <= (767 - scrollBarWidth)) {
            displayAmount = 3;
        } else if(windowWidth <= (999 - scrollBarWidth)) {
            displayAmount = 4;
        } else if(windowWidth > (999 - scrollBarWidth)) {
            displayAmount = 6;
            $(listElem[0]).css('display', 'none');
            $(listElem[listElem.length - 1]).css('display', 'none');
        }

        for (var i = 1; i < listElem.length - 1; i++) {
            if (i <= displayAmount) {
                $(listElem[i]).css('display', 'block');
            } else {
                $(listElem[i]).css('display', 'none');
            }
        }

        // alert('it worked! Display amount: ' + displayAmount);

        counter = 1;
        progressSlide = counter - 1;
        $('#botUsesCard').carousel(progressSlide);
        $('.slide-4 .bottom ul>li .progressbar-container').remove();
        $(listElem[counter]).append('<div class="progressbar-container"></div>');
        progressBarInit();
    };

    $(window).on("orientationchange",function(){
        messengerListResize();
    });


    var $rw = $(window).resize(function(){
        console.log('resized');
        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            messengerListResize();
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
        var botCarousel = $('#botUsesCard');

        botCarousel.bind('slid.bs.carousel', function (e) {
            $('#listScrollPrev, #listScrollNext').each(function (){
                this.style.pointerEvents = 'auto';
            });
        });
        if(param == "next") {
            counter++;
            if(counter > 6) {
                counter = 1;
                console.log('counter = 1!!!');
            }
            progressSlide = counter - 1;
            $('#listScrollNext').each(function (){
                this.style.pointerEvents = 'none';
            });
            botCarousel.carousel(progressSlide);

            if($(listElem[counter]).css('display') == 'none') {
                for(i = 1; i < listElem.length - 1; i++) {
                    $(listElem[i]).css('display', 'none');
                }

                if(displayAmount === 4) {
                    for(i = counter - 2; i < (counter + displayAmount); i++) {
                        $(listElem[i]).css('display', 'block');
                    }
                } else {
                    for(i = counter; i < (counter + displayAmount);i++) {
                        $(listElem[i]).css('display', 'block');
                    }
                }
            }
            $('.slide-4 .bottom ul>li .progressbar-container').remove();
            $(listElem[counter]).append('<div class="progressbar-container"></div>');

            progressBarInit();
        } else {
            counter--;
            if(counter < 1) {
                counter = 6;
                console.log('counter = 6!!!');
            }
            progressSlide = counter - 1;
            $('#listScrollPrev').each(function () {
                this.style.pointerEvents = 'none';
            });
            botCarousel.carousel(progressSlide);

            if($(listElem[counter]).css('display') == 'none') {
                for(i = 1; i < listElem.length - 1; i++) {
                    $(listElem[i]).css('display', 'none');
                }

                if(displayAmount === 4 && counter === 6) {
                    for(i = counter - 3; i < (counter + displayAmount); i++) {
                        $(listElem[i]).css('display', 'block');
                    }
                } else if(displayAmount === 4) {
                    for(i = counter - 1; i < (counter + displayAmount - 1); i++) {
                        $(listElem[i]).css('display', 'block');
                    }
                } else {
                    for(i = (counter - displayAmount + 1); i <= (counter); i++) {
                        $(listElem[i]).css('display', 'block');
                    }
                }
            }

            progressBarInit();
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

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //uploading jquery.mobile scripts only for mobile for swipe event to work
        addJS_Node (null, "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js", null, fireAfterLoad);

        function fireAfterLoad () {
            var botCarousel = $('#botUsesCard');
            botCarousel.on( "swipeleft", function() {
                listScroll("next");
                return false;
            });
            botCarousel.on( "swiperight", function() {
                listScroll("prev");
                return false;
            });

            var botCardCarousel = $('#carouselBotCard');
            botCardCarousel.on( "swipeleft", function() {
                $(this).carousel("next");
                return false;
            });
            botCardCarousel.on( "swiperight", function() {
                $(this).carousel("prev");
                return false;
            });
        }

        //-- addJS_Node is a standard(ish) function
        function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
            var D = document;
            // D.mobile.ajaxEnabled = false;
            var scriptNode = D.createElement ('script');
            if(runOnLoad) {
                scriptNode.addEventListener ("load", runOnLoad, false);
            }
            scriptNode.type                         = "text/javascript";
            if (text)       scriptNode.textContent  = text;
            if (s_URL)      scriptNode.src          = s_URL;
            if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

            $( document ).on( "mobileinit", function() {
                $.mobile.autoInitializePage = false; // This one does the job
            });

            var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
            targ.appendChild (scriptNode);
        }
    }

    alignMessengerTextHeight();
    alignPricingBlocks();
    autosize($('textarea'));
});
