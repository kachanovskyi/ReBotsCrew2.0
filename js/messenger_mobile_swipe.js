if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert('hey, I see that you\'re on mobile!');
}

$(document).ready(function() {
    console.log('script working');
    $('').on( "swipeleft", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        alert('swipe left is working');
    });
    $('').on( "swiperight", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        alert('swipe right is working');
    });
});
