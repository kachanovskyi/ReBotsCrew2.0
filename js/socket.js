var stompClient = null;


$(document).ready(function () {
    connect();
});

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);

}

function connect() {
    console.log("test");
    var socket = new SockJS('/gs-guide-websocket');

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {

        setConnected(true);
        setConnected()
        stompClient.subscribe('/topic/greetings', function (greeting) {

            showGreeting(greeting);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    console.log('send');
    stompClient.send("/app/hello", {}, JSON.stringify({'name': 'pituh'}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}


