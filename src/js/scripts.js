$(document).ready(function () {
    const defaultLang = "en"; // Дефолтный язык (English)
    const storedLang = localStorage.getItem("selectedLang") || defaultLang;

    // Устанавливаем сохранённый язык при загрузке страницы
    $("#selected-lang").text($(`.custom-option[data-lang="${storedLang}"]`).text());
    $(".custom-option").removeClass("selected");
    $(`.custom-option[data-lang="${storedLang}"]`).addClass("selected");

    // Открытие/закрытие списка
    $(".custom-select-trigger").on("click", function () {
        $(".custom-options").toggle();
    });

    // Выбор языка
    $(".custom-option").on("click", function () {
        let selectedLang = $(this).data("lang");

        $("#selected-lang").text($(this).text()); // Обновляем выбранный язык в UI
        $(".custom-option").removeClass("selected");
        $(this).addClass("selected");

        localStorage.setItem("selectedLang", selectedLang); // Сохраняем выбор в LocalStorage
        $(".custom-options").hide();

        // Здесь можно добавить код для смены языка на сайте, например, window.location.reload();
    });

    // Закрытие при клике вне селекта
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".custom-select").length) {
            $(".custom-options").hide();
        }
    });
});

