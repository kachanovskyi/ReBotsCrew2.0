(function () {
    var root = './';
    var baseUrl = "https://54508d08.ngrok.io/id";

    var head = document.getElementsByTagName('head')[0],
        stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = root + 'css/botty.css';
    head.appendChild(stylesheet);

    setTimeout(function () {
        (window.jQuery && init()) || loadScript("https://code.jquery.com/jquery-3.1.1.min.js", init);
    }, 1000);

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        var $ = window.jQuery;

        var anchor = $('<div>')
            .attr('id', 'botty-container')
            .appendTo($('body'));

        var botty = $('<div>')
            .addClass('botty-icon')
            .on('click', chatToggle)
            .appendTo(anchor);
        // .fadeIn("fast");
        var chat = $('.chat-window');

        function chatToggle() {
            var chatWindow = $('.chat-window');

            if (chatWindow.is(':visible')) {

                chatWindow.animate({
                    'opacity': 0,
                    'bottom': 0,
                    'right': 0
                }, 'fast', function () {
                    $(this).hide();
                    botty.removeClass('active');
                })

            } else {

                chatWindow.show().animate({
                    'opacity': 1,
                    'bottom': 30,
                    'right': 130
                }, 'fast', function () {
                    botty.addClass('active');
                    $('#bottyInput').focus();
                });

            }

            // var obj = {
            //     "firstName": "me",
            //     "lastName": "Vova"
            // };
        }

        var setScroll = function(i) {
            if($(i).length>0)
                $(i).niceScroll().updateScrollBar();
        }

        function sendMessage(param, text) {
            var bottyInput = $('#bottyInput'),
                content = $('.content');
            if (param === 'bot') {

                content.append(
                    $('<div class="message-container">').append(
                        $('<div class="message bot">').text(text)
                    )
                );

            } else {
                text = bottyInput.val();

                if (text.length && text.trim() !== " ") {
                    content.append(
                        $('<div class="message-container">').append(
                            $('<div class="message">').text(text)
                        )
                    );
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://192.168.0.101:8080/id',
                    // contentType: "application/json",
                    data: text,
                    // headers: {
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json'
                    // },
                    success: function (data) {
                        sendMessage('bot', "success");
                    },
                    error: function (data) {
                        sendMessage('bot', "Sorry, unfortunately you've got an error");
                    }
                });

                bottyInput.val("");
            }
        }

        (function buildChat() {
            var chatWindow = $('<div>')
                .addClass('chat-window')
                .hide()
                .appendTo(anchor);

            var chatHead = $('<div>')
                .addClass('chat-head')
                .append(
                    $('<p>')
                        .text('Talk to ')
                        .append(
                            $('<span>').text('Botty')
                        )
                )
                .append(
                    $('<div>')
                        .addClass('close-chat')
                        .click(chatToggle)
                )
                .appendTo(chatWindow);

            var chatBody = $('<div>')
                .addClass('chat-body')
                .append(
                    $('<div class="content">')
                )
                .appendTo(chatWindow);

            var chatBottom = $('<div>')
                .addClass('chat-bottom')
                .append(
                    $('<input type="text" placeholder="Type a message..." id="bottyInput">')
                        .keypress(function (event) {
                            if (event.which === 13) {
                                event.preventDefault();
                                sendMessage();
                            }
                        })
                )
                .append(
                    $('<a>')
                        .addClass('botty-send')
                        .text('Send')
                )
                .appendTo(chatWindow);

            // loadScript("", function () {
            //
            // });
            $('.content').jScrollPane();
        })();

        window.bottyInit = init;
        return true;
    }
})();
