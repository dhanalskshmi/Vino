// NProgress

$('body').show();
$('.version').text(NProgress.version);
NProgress.start();
setTimeout(function() {
	NProgress.done(); $('.fade').removeClass('out');
	$('.loaderBlock').detach();
	//$('.siteWrap.fade').removeClass('fade');
	$('html').addClass('bodyBg')
}, 1000);




// Button Effects

(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        duration: 750,

        show: function(e, element) {

            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('btnWaves') !== -1) {
                        continue;
                    }

                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };

    var TouchHandler = {

        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };

    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('btnAnimate') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('btnAnimate')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        Effect.wrapInput($$('.btnAnimate'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    Waves.attach = function(element) {

        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);



// End Off

// Equal Height

function equalheightBlock(container){
  var currentTallest = 0,
  currentRowStart = 0,
  rowDivs = new Array(),
  $el,
  topPosition = 0;
  $(container).each(function() {
    $el = $(this);
    $($el).height('auto');
  });
  $(container).each(function() {
    $el = $(this);
    topPostion = $el.position().top;
    if (currentRowStart != topPostion) {
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPostion;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
  /*else {
    $('.locationSwiper .swiper-slide-visible .fusion-text .locationDecp').each(function() {
    //$(this).css('height','auto');
  });
}*/
}



// Scroll to Top

$('.backtoTop').click(function(event) {
	event.preventDefault();
    $('html, body').animate({
        scrollTop: $("body").offset().top-parseInt(300)
    }, 800);
});







$(window).on("load resize",function(e) {

			 if ($(window).width() >= 768) {
		 		//footer height fixes
		 		//$('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
		 		$(window).on('resize', function(){
		 			//$('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
		 		});
			}
			else {
				$('.siteInner').attr("style","");
			}

			setTimeout(function(){
	      //$('footer').addClass('animateIt');
	    }, 1200);

});

if ($("body").width() <= 767) {
	$('.siteInner').attr("style","");
}
if ($(window).width() >= 768) {
 //footer height fixes
 $('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
}
$(window).on("load resize",function(e) {
	if ($("body").width() <= 767) {
		$('.siteInner').attr("style","");
	}
	if ($(window).width() >= 768) {
	 //footer height fixes
	 $('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
 }














});


$(document).ready(function() {


  //hamburger

  /*$('.hamburger').click(function(f){
    f.preventDefault();
    $(this).toggleClass('active')
    //$('html').toggleClass('menuOpened');
		$('.mnavWrapper').toggleClass('active');
  });*/



  // Mobile Menu Toggle
  $('.inner').css('display', 'none')


  $(window).on("load resize",function(e) {
    var headHgt = $('header').height(true);
    $('.mnavWrapper').css({'top':headHgt});
    $('.innerloginWrapper').css({'top':headHgt});
  });

  $('.msubMenu').click(function(e) {
  	e.preventDefault();
    var $this = $(this);
     //$($this).parent().removeClass('mainActive').addClass('mainActive');
     $(this).parent().parent().find('.hov').not($(this).parent()).removeClass('mainActive');
     $(this).parent().parent().find('.hov').each(function(){
        $(this).find("ul").not($this.next()).slideUp();
     });

     if($(this).parent().hasClass("mainActive"))
     {
       $(this).parent().toggleClass('mainActive');
       $this.next().slideUp();
     }else{
       $(this).parent().toggleClass('mainActive');
       $this.next().slideDown();
     }

  });










	// Mobile Footer Toogle

	if ($(window).width() <= 767) {

	}
  var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
	var wwidth = $(window).width()
	if (wwidth <= 1100) {
	    $('.mainNavigation li').bind(clickHandler, function() {
			});

      $('.mainNavigation li').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      });


    }
    $('.menusearchBlock a').click(function() {
  		$('.menusearchBlock').toggleClass('act');
  		$('.txtBox').focus();
      $('.mainNavigation li').removeClass('active');
    });










  $('.mainNav .submit').click(function(e) {
		$(this).toggleClass('active');
		$('.mainNav .search').toggleClass('active');
	});
  $('.mLogin a').click(function(e) {
		$(this).toggleClass('active');
		$('.loginBlocks').toggleClass('active');
		$('.hamburger, .mnavWrapper, .mobileSearchfield, .mobileSearch .submit').removeClass('active');
		$('html').removeClass('menuOpened');
});
// Hide events when scroll
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 200) {
        $('.loginBlocks, .mLogin a').removeClass('active');
    }
});

	//Remove Loader Fade class


  // Mobile Menu Toggle
	$('.hamburger').click(function(e) {
		$(this).toggleClass('active');
    $('html').toggleClass('menuOpened');
		$('.mnavWrapper').toggleClass('active');
		$('.loginBlocks, .mLogin a, .mobileSearchfield, .mobileSearch .submit').removeClass('active');

	});


  //Mobile Search

	$('.mobileSearch .submit').click(function(e) {
		$(this).toggleClass('active');
		$('.mobileSearchfield').toggleClass('active');
		$('html').removeClass('menuOpened');
		$('.hamburger, .mnavWrapper').removeClass('active');
		$('.loginBlocks, .mLogin a').removeClass('active');
	});






  function isInView(el){if(typeof jQuery!=='undefined'&&el instanceof jQuery)el=el[0];var rect=el.getBoundingClientRect();var windowHeight=(window.innerHeight||document.documentElement.clientHeight);var windowWidth=(window.innerWidth||document.documentElement.clientWidth);return((rect.left>=0)&&(rect.top>=0)&&((rect.left+rect.width)<=windowWidth)&&((rect.top+rect.height)<=windowHeight));}








		// IE FIxes
	  function GetIEVersion() {
	  var sAgent = window.navigator.userAgent;
	  var Idx = sAgent.indexOf("MSIE");

	  // If IE, return version number.
	  if (Idx > 0)
	    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

	  // If IE 11 then look for Updated user agent string.
	  else if (!!navigator.userAgent.match(/Trident\/7\./))
	    return 11;

	  else
	    return 0; //It is not IE
	}

	if (GetIEVersion() > 0)
	   //alert("This is IE " + GetIEVersion());
	    $('html').addClass('ie'+ GetIEVersion());
	else
	   //alert("This is not IE.");
	   $('html').removeClass('ie'+ GetIEVersion());
		 if (navigator.userAgent.indexOf('Edge') >= 0){ $('html').addClass('ieEdge'); }

		 function getOS() {
			 var userAgent = window.navigator.userAgent,
				platform = window.navigator.platform,
				macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
				windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
				iosPlatforms = ['iPhone', 'iPad', 'iPod'],
				os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'MacOS';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'iOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'Linux';
		}

		return os;
	}
	$('html').addClass(getOS());

	function getMobileOperatingSystem() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

				// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
					return "Windows Phone";
			}

			if (/android/i.test(userAgent)) {
					return "Android";
			}

			// iOS detection from: http://stackoverflow.com/a/9039885/177710
			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
					return "iOS";
			}

			return "unknown";
	}


	var isMobile = {
			Android: function() {
					return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
					return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			ipad: function() {
					return navigator.userAgent.match(/iPad|iPod/i);
			},
			Opera: function() {
					return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
					return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
					return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
	};
	if(isMobile.iOS()) {
		//alert('ipad');
				$('html').addClass('iOS');

				var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

if (isChrome) console.log("You are using Chrome!");
if (isSafari) console.log("You are using Safari!");

	}
	if(isMobile.Android()) {
		//alert('ipad');
				$('html').addClass('Android');

	}




});

$(document).ready(function() {
	setTimeout(function(){
		$('.bannerWrapper').addClass('animateIt');
	},1250);
	$('.bannerWrapper').bind('inview', function (event, visible) {
  if (visible == true) {
    alert('visible');
  } else {
    // element has gone out of viewport
  }
});
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
		$("header").removeClass("fixed");
     //>=, not <=
    if (scroll >= 150) {
        //clearHeader, not clearheader - caps H
        //$("header").addClass("fixed");
    }
		else {

		}

});
	$(function () {

  $('.bannerWrapper').bind('inview', function (event, visible) {
		alert('inview');
    if (visible) {
			alert('visible');
      $('.bannerWrapper').addClass('animate-in');
    } else {
      $('.bannerWrapper').addClass('animate-out');
    }
  });

});

});


// Personal Login

if ($('#personalLogin, #businessLogin, #mpersonalLogin, #mbusinessLogin').length > 0) {
	$(document).ready(function() {
    var validator = $('form#personalLogin, form#businessLogin, form#mpersonalLogin, form#mbusinessLogin').validate({
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
        errorPlacement: function (error, element) { }
    });

  });
}



if ($('.joinEmail').length > 0) {
  $(document).ready(function() {

    jQuery.validator.addMethod("EmailVal", function (e, t) {
        var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.optional(t) || o.test(e)
    }, "Please enter a valid email address.")
    var validator = $('#joinemailForm').validate({
        rules: {
            email: {
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
        errorPlacement: function (error, element) { }
    });

  });
}

// Form moduleA
function onSubmit(token) {
  document.getElementById('contactForm').submit();
}
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

$(document).ready(function() {
	$(".timehrsSection").clone().appendTo($(".cloneTimeHrs"));
	
    if ($('.mapSection').length > 0) {
        var map;
        google.maps.event.addDomListener(window, "load", function() {
            var map = new google.maps.Map(document.getElementById("map_div"), {
                center: new google.maps.LatLng(40.137508, -74.089629),
                zoom: 11,
                zoomControl: false,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var infoWindow = new google.maps.InfoWindow();

            /*
             * marker creater function (acts as a closure for html parameter)
             */
            function createMarker(options, html) {
                var marker = new google.maps.Marker(options);
                if (html) {
                    google.maps.event.addListener(marker, "click", function() {
                        infoWindow.setContent(html);
                        infoWindow.open(options.map, this);
                    });
                }
                return marker;
            }
            /*add markers to map*/
            var marker0 = createMarker({
                position: new google.maps.LatLng(40.137508, -74.089629),
                map: map,
            });

            var marker1 = createMarker({
                position: new google.maps.LatLng(40.070730, -74.046798),
                map: map,
            });

            var marker2 = createMarker({
                position: new google.maps.LatLng(40.069431, -74.128023),
                map: map,
            });
            var marker3 = createMarker({
                position: new google.maps.LatLng(40.201300, -74.255699),
                map: map,
            });
            var marker4 = createMarker({
                position: new google.maps.LatLng(40.120684, -74.144013),
                map: map,
            });
        });
    }
});
$(document).ready(function() {
    if ($('.mapLocation').length > 0) {
        var map;
        google.maps.event.addDomListener(window, "load", function() {
            var map = new google.maps.Map(document.getElementById("map_div2"), {
                center: new google.maps.LatLng(40.137508, -74.089629),
                zoom: 11,
                zoomControl: false,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var infoWindow = new google.maps.InfoWindow();

            /*
             * marker creater function (acts as a closure for html parameter)
             */
            function createMarker(options, html) {
                var marker = new google.maps.Marker(options);
                if (html) {
                    google.maps.event.addListener(marker, "click", function() {
                        infoWindow.setContent(html);
                        infoWindow.open(options.map, this);
                    });
                }
                return marker;
            }
            /*add markers to map*/
            var marker0 = createMarker({
                position: new google.maps.LatLng(40.137508, -74.089629),
                map: map,
            });

            var marker1 = createMarker({
                position: new google.maps.LatLng(40.070730, -74.046798),
                map: map,
            });

            var marker2 = createMarker({
                position: new google.maps.LatLng(40.069431, -74.128023),
                map: map,
            });
            var marker3 = createMarker({
                position: new google.maps.LatLng(40.201300, -74.255699),
                map: map,
            });
            var marker4 = createMarker({
                position: new google.maps.LatLng(40.120684, -74.144013),
                map: map,
            });
        });
    }
});