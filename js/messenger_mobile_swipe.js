if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert('hey, I see that you\'re on mobile!');
}

$(document).on('pageinit', function(event){
    $(".slide-1").swiperight(function() {
        // $.mobile.changePage("#page1");
        alert('pageInit swipe works');
    });
});

$(document).ready(function() {
    console.log('script working');
    $('#botUsesCard').on( "swipeleft", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        alert('swipe left is working');
    });
    $('#botUsesCard').on( "swiperight", function() {
        // $.mobile.changePage( next + ".html", { transition: "slide" });
        alert('swipe right is working');
    });
});
