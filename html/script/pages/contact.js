// Form moduleA
if ($('#contactForm').length > 0) {
    $(document).ready(function () {
        var validator = $('#contactForm').validate({
            ignore: [],
            highlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).addClass(errorClass);

                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
            },
            unhighlight: function (element, errorClass) {
                
                var selector = "#" + element.id;
                $(selector).removeClass(errorClass);
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
            },
        });
    });
}
$(document).ready(function(){
    $( ".checkbox" ).focusin(function() {
        console.log("sadgk");
        $(this).closest('.custom-checkbox').find('.checkmark').addClass("FocusIn");
    });
    $( ".checkbox" ).focusout(function() {
        $(this).closest('.custom-checkbox').find('.checkmark').removeClass("FocusIn");
    });
});

$( "#careerInput" ).selectmenu();