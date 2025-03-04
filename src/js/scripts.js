$(document).ready(function () {

    if ($(window).width() < 768) {
        AOS.init({
            disable: true,
        });
    } else {
        AOS.init();
    }
    var $btn = $('.up');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500) {
            $btn.addClass('active');
        } else {
            $btn.removeClass('active');
        }
    });

    $btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
    });

    const defaultLang = "en";
    const storedLang = localStorage.getItem("selectedLang") || defaultLang;

    $("#selected-lang").text($(`.custom-option[data-lang="${storedLang}"]`).text());
    $(".custom-option").removeClass("selected");
    $(`.custom-option[data-lang="${storedLang}"]`).addClass("selected");

    $(".custom-select-trigger").on("click", function () {
        $(".custom-options").toggle();
    });

    $(".custom-option").on("click", function () {
        let selectedLang = $(this).data("lang");
        $("#selected-lang").text($(this).text());
        $(".custom-option").removeClass("selected");
        $(this).addClass("selected");
        localStorage.setItem("selectedLang", selectedLang);
        $(".custom-options").hide();
    });
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".custom-select").length) {
            $(".custom-options").hide();
        }
    });

    $('.burger, .close').on('click', function () {
        $('.burger').toggleClass("active");
        $('.menu_box').toggleClass("show");
        $('#overlay').fadeToggle();
    });

    // Закрытие при клике на overlay
    $('#overlay').on('click', function () {
        $('.burger').removeClass("active");
        $('.menu_box').removeClass("show");
        $(this).fadeOut();
    });
    Fancybox.bind('[data-fancybox="gallery"]', {});
    $('.more').on('click', function(e) {
        e.preventDefault();
        let currentSection = $(this).closest('section');
        let nextSection = currentSection.next('section');
        if (nextSection.length) {
            $('html, body').animate({
                scrollTop: nextSection.offset().top
            }, 500);
        }
    });
    if ($(window).width()< 991) {
        $('.galery_row').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            centerPadding: 0,
            appendDots:$('.dots'),
            // autoplay: true,
            autoplaySpeed: 2000,
            variableWidth: true,
            centerMode: true,
            dots: true,
            initialSlide: 4,
            prevArrow: $('.prev'),
            nextArrow: $('.next')
        });
    }
});

