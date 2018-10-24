// Form moduleA
function onSubmit(token) {
  document.getElementById('contactForm').submit();
}
function onSubmitReOrder(token) {
    document.getElementById('contactForm').submit();
}
$( window ).on("load", function() {
 $('.selectBox').each(function(e) {
    var name = $(this);
    $(this).parent().find('label').attr('for', name.attr('name'));
});
});

if ($('.contactForm').length > 0) {
    $(document).ready(function () {
     
        jQuery.validator.addMethod("EmailVal", function (e, t) {
            var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.optional(t) || o.test(e)
        }, "Please enter a valid email address.")

        jQuery.validator.addMethod("notEqual", function (value, element, param) { return this.optional(element) || value != $(param).val(); }, "This has to be different...");

        var validator = $('.contactForm').validate({
            rules: {
                cntTelePhone: {
                    minlength: 13
                },
                cntEmail: {
                    EmailVal: !0
                },
            },
            ignore: [],
            
            errorPlacement: function (error, element) {
            return true;
        },
        highlight: function (element, errorClass) {
            var selector = "#" + element.id;
            $(selector).addClass(errorClass);

            $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
        },
        unhighlight: function (element, errorClass) {

            var selector = "#" + element.id;
            $(selector).removeClass(errorClass);
            $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
        },
            submitHandler: function (form) {
                var reCaptchaID = GetReCaptchaID("capt_contact");
                grecaptcha.reset(reCaptchaID);
                grecaptcha.execute(reCaptchaID);
            },
            // errorPlacement: function (error, element) { 
            //     return true;
            // }
        });
        jQuery("#cntTelePhone").length > 0 && document.getElementById("cntTelePhone").addEventListener("input", function (e) {
            var t = e.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = t[2] ? "(" + t[1] + ") " + t[2] + (t[3] ? "-" + t[3] : "") : t[1]
        })
          $('.contactForm input').keydown(function(event) {
        var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
        if  ( keycode  == 13) {   // key code for enter key

        return false;
        } else  {

        validator.checkForm();
        }
    });

    $('.contactForm .selectBox').not("select.multiple, #state, #country").selectmenu({
        style: 'dropdown',
        transferClasses: true,
        change: function() {
          $('.contactForm').validate().element(this);
       }
      });
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