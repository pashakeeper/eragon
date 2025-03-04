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
        if ($(this).scrollTop() > 100) {
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
    $('.more').on('click', function (e) {
        e.preventDefault();
        let currentSection = $(this).closest('section');
        let nextSection = currentSection.next('section');
        if (nextSection.length) {
            $('html, body').animate({
                scrollTop: nextSection.offset().top
            }, 500);
        }
    });
    if ($(window).width() < 991) {
        $('.galery_row').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            centerPadding: 0,
            appendDots: $('.dots'),
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
    $('.collapse_box .collapse_header').on('click', function () {
        let content = $(this).next('.collapse_content');
        let icon = $(this).find('i');

        if (content.is(':visible')) {
            content.slideUp();
            icon.removeClass('fa-minus').addClass('fa-plus');
        } else {
            $('.collapse_content').slideUp('fast');
            $('.collapce_header i').removeClass('fa-minus').addClass('fa-plus'); // Меняем все иконки на +

            content.slideDown('fast');
            icon.removeClass('fa-plus').addClass('fa-minus');
        }
    });
    $('.tabs_list li a').on('click', function (e) {
        e.preventDefault();

        let tabId = $(this).text().toLowerCase().replace(/\s+/g, '-'); // Генерируем data-id
        let selectedTab = $('.tabs_content .row[data-id="' + tabId + '"]');

        if (selectedTab.hasClass('active')) return;
        $('.tabs_list li a').removeClass('active');
        $('.tabs_content .row').removeClass('active');
        selectedTab.addClass('active');
        $(this).addClass('active');
    });
    if ($(window).width() < 991) {
        $('.tabs_list').slick({
            slidesToShow: 1, // Количество видимых элементов
            slidesToScroll: 1,
            infinite: false,
            variableWidth: true, // Автоматическая ширина
            arrows: true,
            prevArrow: '<button class="scroll-btn scroll-left">←</button>',
            nextArrow: '<button class="scroll-btn scroll-right">→</button>',
        });
    }

});

