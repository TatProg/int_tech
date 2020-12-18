$(document).ready(function () {
    console.log(123);
});

$(document).on("click", ".dev_about", function () {
    $('.dev_interests').toggleClass('display-none');
});
