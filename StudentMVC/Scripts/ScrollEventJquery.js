var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // downscroll code
        document.getElementById("nav").style.display = "none"
    } else {
        // upscroll code
        document.getElementById("nav").style.display = "flex"
    }
    lastScrollTop = st;
});