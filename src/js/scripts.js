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
        $('.faq_section .tabs_list').slick({
            slidesToShow: 1, // Количество видимых элементов
            slidesToScroll: 1,
            infinite: false,
            variableWidth: true, // Автоматическая ширина
            arrows: true,
            draggable: true, // Включает возможность перетаскивания
            swipe: true, // Разрешает свайпы на тач-устройствах
            touchMove: true,
        });
    }
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let currentDayIndex = today.getDate() - ((today.getDay() || 7) - 1); // Начало текущей недели (понедельник)

    function updateCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        $("#currentMonth").text(`${monthNames[currentMonth]} ${currentYear}`);
        generateWeekView();
    }

// Генерация недельного вида с днями недели (начало с Понедельника)
    function generateWeekView() {
        $("#weekView").empty();
        let weekDays = ["M", "T", "W", "T", "F", "S", "S"];
        let firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() || 7) - 1; // Приводим воскресенье (0) к 7
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < 7; i++) {
            let dateNum = currentDayIndex + i;

            // Если дата выходит за границы месяца - пересчет
            if (dateNum < 1) {
                let prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
                dateNum = prevMonthLastDate + dateNum;
            } else if (dateNum > lastDate) {
                dateNum -= lastDate;
            }

            let isToday = (dateNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());

            let dateDiv = $(`
            <div class="date ${isToday ? "today" : ""}" data-date="${dateNum}">
                <div class="day-name">${weekDays[i]}</div>
                <div class="day-number">${dateNum}</div>
            </div>
        `);

            dateDiv.on("click", function () {
                $(".date .day-number").removeClass("selected"); // Удаляем класс только с чисел
                $(this).find(".day-number").addClass("selected");
                loadTimeSlots(); // Обновляем время при смене дня
            });

            $("#weekView").append(dateDiv);
        }
    }

// Генерация 24 временных слотов (00:00 - 23:00)
    function loadTimeSlots() {
        $("#timePicker").empty();
        for (let hour = 0; hour < 24; hour++) {
            let time = `${hour.toString().padStart(2, '0')}:00`;

            let timeSlot = $("<div>")
                .addClass("time_slot")
                .text(time)
                .on("click", function () {
                    $(".time_slot").removeClass("active");
                    $(this).addClass("active");
                });

            $("#timePicker").append(timeSlot);
        }
    }

// Навигация по месяцам
    $("#prevMonth").click(function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        currentDayIndex = 1; // Начинаем с 1-го числа месяца
        updateCalendar();
    });

    $("#nextMonth").click(function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        currentDayIndex = 1; // Начинаем с 1-го числа месяца
        updateCalendar();
    });

// Навигация по неделям
    $("#prevWeek").click(function () {
        currentDayIndex -= 7;
        let firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() || 7) - 1;
        if (currentDayIndex < -firstDayOfMonth) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            let lastDatePrevMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            currentDayIndex = lastDatePrevMonth - 7 + firstDayOfMonth;
        }
        updateCalendar();
    });

    $("#nextWeek").click(function () {
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
        if (currentDayIndex + 7 > lastDate) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            currentDayIndex = 1;
        } else {
            currentDayIndex += 7;
        }
        updateCalendar();
    });

    updateCalendar();
    loadTimeSlots();
    let currentStep = 0;
    const steps = $(".tabs_list li a");
    const contents = $(".tabs_content > .row");
    const nextBtn = $(".purple_btn");
    const backBtn = $(".back_btn");

    function showStep(index) {
        steps.removeClass("active").eq(index).addClass("active");
        contents.removeClass("active").eq(index).addClass("active");
        currentStep = index;

        if (contents.eq(index).data("id") === "finish") {
            nextBtn.hide();
            backBtn.text("Back to main page").addClass("finish").attr("href", "/");
        } else {
            nextBtn.show();
            backBtn.text("Previous").removeClass("finish").removeAttr("href");
        }
    }
    $(".tabs_list li a").click(function (e) {
        e.preventDefault();
        const index = $(this).parent().index();
        showStep(index);
    });

    nextBtn.click(function (e) {
        e.preventDefault();
        if (contents.eq(currentStep).data("id") === "subscription") {
            showStep(contents.index($("[data-id='finish']")));
        } else {
            showStep(currentStep + 1);
        }
    });

    backBtn.click(function (e) {
        if ($(this).hasClass("finish")) {
            window.location.href = "/";
        } else if (currentStep > 0) {
            showStep(currentStep - 1);
        }
    });

    showStep(0);

    $(".un_btn").click(function (e) {
        e.preventDefault();
        let targetId = $(this).data("target"); // Получаем data-target из кнопки
        $(".un_content").removeClass("active"); // Скрываем все
        $('.un_content[data-id="' + targetId + '"]').addClass("active"); // Показываем нужный блок
    });



});

