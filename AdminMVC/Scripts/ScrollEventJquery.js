var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // downscroll code
        document.getElementById("nav").style.display = "none"
    } else if( st < 65){
        // upscroll code
        document.getElementById("nav").style.display = "flex"
    }
    lastScrollTop = st;
});


//var prevScrollpos = window.pageYOffset;
//window.onscroll = function () {
//    var currentScrollPos = window.pageYOffset;
//    if (prevScrollpos > currentScrollPos) {
//        document.getElementById("nav").style.display = "flex";
//    } else {
//        document.getElementById("nav").style.display = "none";
//    }
//    prevScrollpos = currentScrollPos;
//}