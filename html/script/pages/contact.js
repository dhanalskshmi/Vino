// Form moduleA
if ($('#contactForm').length > 0) {
    $(document).ready(function () {
        jQuery.validator.addMethod("EmailVal", function (e, t) {
            var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.optional(t) || o.test(e)
        }, "Please enter a valid email address.")
        var validator = $('#contactForm').validate({
            rules: {
                cntTelePhone: {
                    minlength: 13
                },
                cntEmail: {
                    EmailVal: !0
                },
            },
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
                $('input[type="text"]').each(function () {
                    if ($(this).val() == "") {
                        $(this).parent().removeClass("successForm");
                    }
                });
            },
            submitHandler: function (form) {
                grecaptcha.execute();
            },
            errorPlacement: function (error, element) { }
        });
        jQuery("#cntTelePhone").length > 0 && document.getElementById("cntTelePhone").addEventListener("input", function (e) {
            var t = e.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = t[2] ? "(" + t[1] + ") " + t[2] + (t[3] ? "-" + t[3] : "") : t[1]
        })
    });
}
$(document).ready(function () {
    if ($('.checkbox').length > 0) {
        $(".checkbox").focusin(function () {
            console.log("sadgk");
            $(this).closest('.custom-checkbox').find('.checkmark').addClass("FocusIn");
        });
        $(".checkbox").focusout(function () {
            $(this).closest('.custom-checkbox').find('.checkmark').removeClass("FocusIn");
        });
    }

});
