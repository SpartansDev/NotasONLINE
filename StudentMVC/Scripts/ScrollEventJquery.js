var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // downscroll code
        document.getElementById("nav").style.display = "none"
    } else if (st < 65) {
        // upscroll code
        document.getElementById("nav").style.display = "inline-flex"
    }
    lastScrollTop = st;
});