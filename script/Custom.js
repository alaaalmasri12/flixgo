$(".fa-search").on("click", function () {

    $(".seachdiv").slideToggle();
})


$(function () {
    'use strict'

    $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    $('.navbar-nav>li>.nav-link').on('click', function () {
        $('#navbarsExampleDefault .offcanvas-collapse').toggleClass('open')
    })
})
$(".navbar-toggler").click(function () {
    $(this).toggleClass("collapsed");
})
$("#nav-dropdown").on("click", function () {
    $(".pages-dropdown").slideToggle();

})
$("#responsivenav-dropdown").on("click", function () {
    $(".responsivesidemenu").slideToggle();

})
const elements = document.querySelectorAll(['range-slider']);
elements.forEach(element => {
    element.insertAdjacentHTML('afterend', `
<output>5.5</output>
`);
});
$("range-slider").on("change", function (e) {
    const input = e.target;
    const output = input.nextElementSibling;
    if (output) {
        output.textContent = input.value;
    }

});
$('.seachinput').on("keypress", function (e) {
    var dInput = this.value;

    if (e.keyCode == 13) {
        window.location.href = "searchResult.html?query=" + dInput;
    }
});

$(".btnseach ").on("click",function(){
    var dInput = $(".seachinput").val();
    if(dInput !="")
    {
        window.location.href = "searchResult.html?query=" + dInput;
    }
})
function scrolltop()
{
    $("html, body").animate({ scrollTop: 0 }, "slow");

}
