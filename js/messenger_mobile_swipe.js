if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert('hey, I see that you\'re on mobile!');
}

$(document).ready(function() {
    console.log('script working');
    $('#botUsesCard .carousel-inner').on( "swipeleft", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        console.log('swipe left is working');
    });
    $('#botUsesCard .carousel-inner').on( "swiperight", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        console.log('swipe right is working');
    });
});
