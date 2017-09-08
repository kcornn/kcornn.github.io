//sticky navbar
$(document).ready(function(){
    $("#sticker").sticky({topSpacing:0});
  });

//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-default").addClass("top-nav-collapse");
    } else {
        $(".navbar-default").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function () {
    var selected = "";
    $(".btn-proj").click(function () {
        selected = $(this).attr("data-rel");
        console.log(selected);
        $("#portfolio").fadeTo(300,0.1);
        $("#portfolio div").not("."+selected).fadeOut().removeClass('animated');
        setTimeout(function () {
            $("."+selected).fadeIn().addClass('animated');
            $("#portfolio").fadeTo(300,1);
        },200);
    });
});