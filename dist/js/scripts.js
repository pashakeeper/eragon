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
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let currentDayIndex = 0;

    function updateCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        $("#currentMonth").text(`${monthNames[currentMonth]} ${currentYear}`);
        generateWeekView();
    }

    function generateWeekView() {
        $("#weekView").empty();
        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < 7; i++) {
            let dateNum = currentDayIndex + i + 1;
            if (dateNum > lastDate) dateNum -= lastDate;

            let isToday = (dateNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());
            let dateDiv = $(`<div class="date ${isToday ? "today" : ""}" data-date="${dateNum}">${dateNum}</div>`);
            dateDiv.on("click", function () {
                $(".date").removeClass("selected");
                $(this).addClass("selected");
            });
            $("#weekView").append(dateDiv);
        }
    }

    function loadTimeSlots() {
        let times = [
            "04:00", "05:00", "06:00", "07:00", "08:00",
            "09:00", "10:00", "11:00", "12:00", "13:00",
            "14:00", "15:00", "16:00", "17:00", "18:00",
            "19:00", "20:00", "21:00", "22:00", "23:00"
        ];

        times.forEach(time => {
            let timeSlot = $("<div>")
                .addClass("time_slot")
                .text(time);

            timeSlot.on("click", function () {
                $(".time_slot").removeClass("active");
                $(this).addClass("active");
            });

            $("#timePicker").append(timeSlot);
        });
    }
    loadTimeSlots();

    $("#prevMonth").click(function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    $("#nextMonth").click(function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    $("#prevWeek").click(function () {
        if (currentDayIndex > 0) {
            currentDayIndex -= 7;
        } else {
            currentDayIndex = 0;
        }
        generateWeekView();
    });

    $("#nextWeek").click(function () {
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
        if (currentDayIndex + 7 < lastDate) {
            currentDayIndex += 7;
        }
        generateWeekView();
    });

    updateCalendar();


});

