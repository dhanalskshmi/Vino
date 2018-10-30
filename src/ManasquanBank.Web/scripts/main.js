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
				 $('.loginBlocks.active').removeClass('active');
		 		//footer height fixes
		 		//$('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
		 		$(window).on('resize', function(){
		 			//$('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
					$('.loginBlocks.active').removeClass('active')
		 		});
			}
			else {
				$('.siteInner').attr("style","");
			}

			setTimeout(function(){
	      //$('footer').addClass('animateIt');
	    }, 1200);

			//var headHgt = $('header').outerHeight();
			//console.log(headHgt);


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

	$(".marginWrap ul li a").not(".inner li a").click(function(e) {


    var $this = $(this);
if($(e.target).closest("span").length==0){
		if($this.hasClass("msubMenu")){
			$(".marginWrap ul li a").not(".inner li a").not($this).removeClass("menuOpen");
			$($this).toggleClass("menuOpen");
			$($this).parent().find(".inner li a").removeClass("menuOpen");
		}
	}

	});


	$(".inner li a").click(function(e) {

    var $this = $(this);
if($(e.target).closest("span").length==0){
		if($this.hasClass("msubMenu")){
			$(".inner li a").not($this).removeClass("menuOpen");
			$($this).toggleClass("menuOpen");
		}
}
	});

	$(".msubMenu").each(function(){
		$(this).wrapInner( "<span></span>");
	});

  $('.msubMenu').click(function(e) {

    var $this = $(this);


		if($(e.target).closest("span").length==0){
				e.preventDefault();
     if ($this.next().hasClass("mainActive"))
     {
       $this.next().toggleClass('mainActive');
			 $this.parent().parent().removeClass('mainActive');

       $this.next().slideUp();
     }else{

			 $this.parent().parent().find('li .inner').removeClass('mainActive');
        $this.parent().parent().find('li .inner').slideUp();
        $this.next().toggleClass('mainActive');
        $this.next().slideToggle();
     }

	 }

  });



	/*$('.msubMenu').click(function(e) {
  	e.preventDefault();
    var $this = $(this);
    // // $($this).parent().removeClass('mainActive').addClass('mainActive');
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

  });*/












	// Mobile Footer Toogle

	if ($(window).width() <= 767) {

	}
  var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
	var wwidth = $(window).width()
	if (wwidth <= 1100) {
	    $('.mainNav li').bind(clickHandler, function() {
				$(this).addClass('active')
			});

      $('.mainNav li').click(function() {
        $(this).siblings().removeClass('active');
      });

			$('.mainNav li').click(function() {
				$(this).toggleClass('active')
			});


    }
    $('.mainNav li.search a').click(function() {
  		$(this).toggleClass('act');
  		$('.txtBox').focus();
    });













		$(".mainNav li.item-1, .mainNav li.item-2, .mainNav li.item-3, .mainNav li.item-4").removeClass('visibilityHide')
  $('.mainNav .submit').click(function(e) {
		$(this).toggleClass('active');
		$('.mainNav li.search').toggleClass('searchOpen');
		$(".mainNav li.item-1, .mainNav li.item-2, .mainNav li.item-3, .mainNav li.item-4").removeClass('visibilityHide');
		if($(this).parent().parent().hasClass("searchOpen")){
			$(this).parent().parent().siblings().addClass('visibilityHide');
		}
		//$(".mainNav li.item-1, .mainNav li.item-2, .mainNav li.item-3, .mainNav li.item-4").toggleClass('visibilityHide');


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
    if (scrollTop > 900) {
        $('.loginBlocks, .mLogin a').removeClass('active');
        $('.mainNav ul li a').removeClass('active');
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

if (isChrome) {console.log("You are using Chrome!")};
if (isSafari) console.log("You are using Safari!");

	}

	if(isMobile.Android()) {
		//alert('ipad');
				$('html').addClass('Android');

	}

	$(document).ready(function() {
  var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
      browser;
  if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
    browser = "msie";
  }
  else {
    browser = ua[1].toLowerCase();
  }
  //$('html' + browser).addClass("active");
	if (navigator.userAgent.match(/firefox/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
    $('html').addClass("firefox");
  }
	if (navigator.userAgent.match(/chrome/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
    $('html').addClass("chrome");
  }
});





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
    var validator = $('form#personalLogin').validate({
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
    var validator = $('form#businessLogin').validate({
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
		var validator = $('form#mpersonalLogin').validate({
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
		var validator = $('form#mbusinessLogin').validate({
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

function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

$(document).ready(function() {
	$(".SubmenuWrapper").each(function(){
		var className="col-"+$(this).find(".cols").length;
		$(this).addClass(className);
		$(this).parent().find("a").each(function(i){
			if(i==0){
				$(this).addClass("hasSubmenu");
			}
		});

	});

	$("a.hasSubmenu").click(function(e){
		if(is_touch_device()){
			e.preventDefault();
		}
	});

	$('.SubmenuWrapper').css({'top': $('header').outerHeight()});
	$(window).on("load resize",function() {
		$('.SubmenuWrapper').css({'top': $('header').outerHeight()});
	});

});


function onSubmit(token) {
    document.getElementById('contactForm').submit();
}
function onSubmitNews(token) {
    document.getElementById('joinemailForm').submit();
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
        submitHandler: function (form) {
            var reCaptchaID = GetReCaptchaID("capt_join");
            grecaptcha.reset(reCaptchaID);
            grecaptcha.execute(reCaptchaID);
        },
        errorPlacement: function (error, element) { }
    });

  });
}

// Home PopUP
var isshow = window.localStorage.getItem('isshow');
var isshowalert = window.localStorage.getItem('isshowalert');
if(isshow == null){

    setTimeout(function() {
    $('html').addClass('popUpOpen');
    if($('.popUpWrapper').length > 0){
        setTimeout(function(){
          $('.popupWrap .wrap,.popUpWrapper').addClass('Open');
        },100);
    }

  },3500);
}
if(isshowalert == null){
    $(".alertsPannel").fadeIn();
    $(".floatingAlerts").fadeIn();
}

$('.close').click(function() {
  $('html').removeClass('popUpOpen');
  $('.popupWrap .wrap,.popUpWrapper').removeClass('Open');
  window.localStorage.setItem('isshow', 1);
});
$('.close-alerts').click(function() {
    $(this).closest(".alertsPannel").fadeOut();
    $(this).closest(".floatingAlerts").fadeOut();
    window.localStorage.setItem('isshowalert', 1);
    setTimeout(function(){
      //alert($('header').outerHeight());
      $('.SubmenuWrapper').css({'top': ''});
  	},100);

});
$('.contiLnk').on('click',function(){
    window.localStorage.setItem('isshow', 1);
    $('html').removeClass('popUpOpen');
    $('.popupWrap .wrap,.popUpWrapper').removeClass('Open');

});


$(document).ready(function() {
    $("#contactSucc").length > 0 && $("html, body").animate({
        scrollTop: $(".contactFormWrap").offset().top - 200
    }, "slow")
});
$(document).ready(function() {
    $("#joinSuccess").length > 0 && $("html, body").animate({
        scrollTop: $(".joinEmail").offset().top
    }, "slow")
});
function isInView(el) {
    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];
    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return ((rect.left >= 0) && (rect.top >= 0) && ((rect.left + rect.width) <= windowWidth) && ((rect.top + rect.height) <= windowHeight));
}

$(".grecaptcha-badge").hide();
if ($('form.wpcf7-form').length > 0) {
    $(window).on("load resize scroll", function(e) {
        var top_of_element = $("form.wpcf7-form").offset().top;
        var bottom_of_element = $("form.wpcf7-form").offset().top + $("form.wpcf7-form").outerHeight();
        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        var top_of_screen = $(window).scrollTop();
        var top_of_element1 = $("form#joinemailForm").offset().top;
        var bottom_of_element1 = $("form#joinemailForm").offset().top + $("form#joinemailForm").outerHeight();
        var bottom_of_screen1 = $(window).scrollTop() + window.innerHeight;
        var top_of_screen1 = $(window).scrollTop();

        if(((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) || ((bottom_of_screen1 > top_of_element1) && (top_of_screen1 < bottom_of_element1))){
            $("form.wpcf7-form .grecaptcha-badge").show();
        }
        else {
            $("form.wpcf7-form .grecaptcha-badge").hide();
        }
    });
}
function GetReCaptchaID(containerID) {
    var retval = -1;
    $(".g-recaptcha").each(function(index) {
        if(this.id == containerID)
        {
            retval = index;
            return;
        }
     });

     return retval;
}


function equalHeight(group) {
   tallest = 0;
   group.each(function() {
     $(this).css("height","auto");
      thisHeight = $(this).height();
      if(thisHeight > tallest) {
         tallest = thisHeight;
      }
   });
   group.height(tallest);
}


if ($('.eventsPannel').length > 0) {
  $(window).on('load resize', function () {
    equalHeight($(".evenhgt"));
  });
}

$(document).ready(function(){
    $(".scroll").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
          scrollTop: ($(target).offset().top)
        }, 500);
     });
     if ($('.warnAlert').length > 0) {
        setTimeout(function() {
            $('.warnAlert').fadeOut();
          },7000);
     }
});
$(document).ready(function(){
    "use strict";
    var form = $(".form-login"),
        url = {
            protocol: "https://",
            roDomain: "web1.secureinternetbank.com",
            ro: "/pbi_pbi1961/pbi1961.ashx?wci=RemoteLogin&logonby=connect3&prmaccess=Portfolio&rt=",
            boDomain: "web1.secureinternetbank.com",
            bo: "/ebc_ebc1961/ebc1961.ashx?wci=Process&wce=RemoteLogon&irl=T&mfa=2&rt=",
            rt: "221272167"
        };
    form.on("submit", function() {
        if (!this.AccessID.value) {
            alert("Please enter a valid Access ID. Thank you!");
            return false
        }
        this.nmUID.value = this.AccessID.value;
        this.nmRTN.value = url.rt;
        this.action = url.protocol + (this.app.value == 0 ? url.roDomain + url.ro : url.boDomain + url.bo) + url.rt
    })
});
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
    

    $('.contactForm .selectBox').not("select.multiple, #country").selectmenu({
        style: 'dropdown',
        transferClasses: true,
        change: function() {
          $('.contactForm').validate().element(this);
       }
      });
      $("#state,#country").on('selectmenuchange', function() {
        validator.checkForm();
        if($('#state').val() == ""){
            $("#state").parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
        } else{
            $("#state").parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
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

if ($('.timelineWrappers').length > 0) {

function windowSize(){

  var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 return x;

}



function windowHeight(){

  var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 return y;

}


function animate_time_line() {

     if(!$('.decade-wrapper').hasClass('scrolling')){

       $('ul.timeline.active .timeline-panel').each(function() {

         var e = 0;

         if ($(window).scrollTop() + windowHeight() > $(this).offset().top && $(this).hasClass("is-hidden")) {

             var a = $(this);
             setTimeout(function() {
             a.removeClass("is-hidden").addClass("animated swing");
             }, e);
         }
         e += 300;
       });

       }

     }


function auto_video_height(){


   if($('.homeBanner-wrapper video').length>0){



      if(windowSize()>=768)
       {
         $('.timelineWrapper .homeBanner-wrapper').attr("style","");
         var h=windowHeight();
         $('header,header .homeBanner-wrapper').css({'height':h});

       }
       else{
         $('header,header .homeBanner-wrapper').attr("style","");
         var h=windowHeight() - $('header').innerHeight();
         $('.timelineWrapper .homeBanner-wrapper').css({'height':h});

       }





   }


}




 function make_position_margin()
 {

   var w=$('header .container').width();
   $('.footer-wrapper').css('width',w);

 }



function indexOfMax(arr) {
   if (arr.length === 0) {
       return -1;
   }

   var max = arr[0];
   var maxIndex = 0;

   for (var i = 1; i < arr.length; i++) {
       if (arr[i] > max) {
           maxIndex = i;
           max = arr[i];
       }
   }

   return maxIndex;
}


 function auto_position_timeline(){


   var leftTopMargin=0;
   var rightTopMargin=0;
   var pos=[];
   var key=0;


   $('.timeline.active li').each(function(){

     if(!$(this).hasClass('clearfix'))
     {
       $(this).attr('style','');

     }

   });

   $('.timeline.active li:not(".timeline-inverted")').each(function(){

         var gap=0;
         if(windowSize()>=1360)
         {
           if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
           {

             var top=$(this).offset().top;
             var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

             gap=Math.round(top-prevTop);
               if(gap>60){

               gap=gap-60;
               //$(this).css({'position':'relative','top':'-'+gap});
               $(this).css({'margin-top':'-'+gap});

             }

             leftTopMargin=$(this).offset().top+$(this).outerHeight();
             pos[key]=leftTopMargin;
             key++;

           }
         } else if(windowSize()>=1024){

               if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
                 {

                   var top=$(this).offset().top;
                   var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

                   gap=Math.round(top-prevTop);
                     if(gap>30){

                     gap=gap-30;
                     //$(this).css({'position':'relative','top':'-'+gap});
                     $(this).css({'margin-top':'-'+gap});

                   }

                   leftTopMargin=$(this).offset().top+$(this).outerHeight();
                   pos[key]=leftTopMargin;
                   key++;

                 }

         }
         else if(windowSize()<=1023 && !$(this).hasClass('clearfix'))
         {

           $(this).attr('style','');
         }



   });



   $('.timeline.active li.timeline-inverted').each(function(){

         var gap=0;


         if(windowSize()>=1360)
         {
           if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
           {

             var top=$(this).offset().top;
             var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

             gap=Math.round(top-prevTop);
               if(gap>60){

               gap=gap-60;
               //$(this).css({'position':'relative','top':'-'+gap});
               $(this).css({'margin-top':'-'+gap});

             }

             rightTopMargin=$(this).offset().top+$(this).outerHeight();
             pos[key]=rightTopMargin;
             key++;


           }
         } else if(windowSize()>=1024){

               if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
                 {

                   var top=$(this).offset().top;
                   var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

                   gap=Math.round(top-prevTop);
                     if(gap>30){

                     gap=gap-30;
                     //$(this).css({'position':'relative','top':'-'+gap});
                     $(this).css({'margin-top':'-'+gap});

                   }
                 rightTopMargin=$(this).offset().top+$(this).outerHeight();
                 pos[key]=rightTopMargin;
                 key++;


                 }

         }
         else if(windowSize()<=1023 && !$(this).hasClass('clearfix'))
         {

           $(this).attr('style','');
         }





   });


}



 var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
   var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
   var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
   var is_safari = navigator.userAgent.indexOf("Safari") > -1;
   var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
   if ((is_chrome)&&(is_safari)) {is_safari=false;}
   if ((is_chrome)&&(is_opera)) {is_chrome=false;}

$(document).ready(function(){


 // Find all data-toggle="sticky-onscroll" elements
 $('.decade-wrapper').each(function() {
   var sticky = $(this);
   var stickyWrapper = $('<div>').addClass('sticky-wrapper').addClass('hidden-xs'); // insert hidden element to maintain actual top offset on page
   sticky.prepend(stickyWrapper);

 });

 $('.decade-year-dropdown').selectmenu();

 //$("a.watch_video").YouTubePopUp();


 $('li.audio').click(function(){

     if($(this).data('mute')){

       $(this).find('.audio').hide();
       $(this).find('.audioMute').css({
         "opacity":"0",
         "display":"block",
       }).show().animate({opacity:1});
       $(this).data('mute',false);

        $("video").prop('muted', false) ;

     }else{
       $(this).find('.audioMute').hide();
       $(this).find('.audio').css({
         "opacity":"0",
         "display":"block",
       }).show().animate({opacity:1});

       $(this).data('mute',true);
        $("video").prop('muted', true)
     }

 });


 $('.arrow-down a').click(function(e){
 var tab_id = $(this).attr('href');

  /*$('html, body').animate({
       scrollTop: $(tab_id).offset().top
   }, 2000);*/

 e.preventDefault();
 });


 $('.arrow-up a').click(function(e){
 var tab_id = $(this).attr('href');

  $('html, body').animate({
       scrollTop: 0
   }, 2000);

 e.preventDefault();
 });


 $( "body").on( "click", 'ul.tabs li:nth-child(even) a,.ui-widget.ui-widget-content li:nth-child(even)', function( event ) {
   $('body').removeClass('odd').addClass('even');
 });


 $( "body").on( "click", 'ul.tabs li:nth-child(odd) a,.ui-widget.ui-widget-content li:nth-child(odd)', function( event ) {
   $('body').removeClass('even').addClass('odd');
 });


 $('ul.tabs li a').click(function(e){

   if(!$(this).hasClass('active')){


       var tab_id = $(this).attr('href');

       $('ul.tabs li a').removeClass('active');

       $(this).addClass('active');

       $(".timeline").removeClass('active');

       $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $(tab_id+'_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $('.timeline li:not(".clearfix")').attr('style','');


       var overlapHeight=0;
       if($('.decade-wrapper').hasClass('sticky'))
       {

         overlapHeight=$('.decade-wrapper').outerHeight()/2;
       }

       $('.sticky-wrapper').attr('style','');
       $('.decade-wrapper').removeClass( "sticky");
       $('.decade-wrapper').addClass('scrolling');
       $(tab_id).addClass('active');
       $(tab_id+'_flex').addClass('active');
       tab_id=tab_id.replace("#","");
       $('.decade-year-dropdown').val(tab_id);
       $('.decade-year-dropdown').selectmenu("refresh");

       if(overlapHeight!=0)
       {
        $('html, body').stop().animate({
           scrollTop: $('.decade-wrapper').offset().top-overlapHeight
         },750, function() {
           //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);

            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

             });
         }
         else
         {

            $('html, body').stop().animate({
              scrollTop: $('.decade-wrapper').offset().top-overlapHeight
             },750, function() {


             });

              $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();
         }




    }
   e.preventDefault();

 });


 $('.decade-year-dropdown').on('selectmenuchange', function() {

     var tab_id="#"+$(this).val();
     $('ul.tabs li a').removeClass('active');

     $("ul.tabs li a[href='"+tab_id+"']").addClass('active');

     $(".timeline").removeClass('active');
     $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $(tab_id+'_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');

       //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);
       $(tab_id).addClass('active');
       $(tab_id+'_flex').addClass('active');
       $('.decade-wrapper').addClass('scrolling');

       var overlapHeight=0;
       if($('.decade-wrapper').hasClass('sticky'))
       {

         overlapHeight=$('.decade-wrapper').outerHeight()/2;
       }


       $('.sticky-wrapper').attr('style','');
       $('.decade-wrapper').removeClass( "sticky");
       $('.ui-selectmenu-menu').removeClass( "sticky");
       $('.ui-selectmenu-button').removeClass("sticky_select");




        if(overlapHeight!=0)
       {
        $('html, body').stop().animate({
           scrollTop: $('.decade-wrapper').offset().top
         },750, function() {
           //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);

            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

         });
         }
         else{


            $('html, body').stop().animate({
              scrollTop: $('.decade-wrapper').offset().top-overlapHeight
             },750, function() {


             });


            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

         }




 });

 //make_sticky_nav();
 make_position_margin();

 //auto_video_height();
 animate_time_line();
 //scrolltobottomarrowfit();

 $(window).on("load resize scroll",function(e){
   //make_sticky_nav();
   console.log("test");
 animate_time_line();
 auto_position_timeline();
 //scrolltobottomarrowfit();
 });

 var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

 if(isMobile && $('video').length>0) {

     var posterUrl=$('header .homeBanner-wrapper video').attr('poster');
     $('header .homeBanner-wrapper video').remove();
     $('header .homeBanner-wrapper').html('<img src="'+posterUrl+'" alt="banner" />');
   }

 $(window).on("load resize",function(e){
 animate_time_line();
   make_position_margin();
 //auto_video_height();
 });


 $(function () {
    $("#timeline_dropdown-menu").addClass('timeline_dropdown');
    $('#timeline_dropdown-button').addClass('timelineselectNav');
    $('#decade-year-dropdown').selectmenu( 'menuWidget' ).addClass('mtimeline');
    $(".ui-selectmenu-menu").addClass( 'mtimelineLst' );
  });





 });
}

$(document).ready(function() {
	$(".timehrsSection").clone().appendTo($(".cloneTimeHrs"));
});
$(window).on("load resize", function(e) {
    var windowSize = $(window).width();
    if ($('.serviceContent').length > 0) {
        $('.serviceContent .serviceDetail').find('h4').css('height', '');
        // if (windowSize > 801 || windowSize < 800) {
        $('.serviceContent').each(function() {
            if (windowSize > 768 && windowSize <= 1023) {
                var row = 2;
            } else if (windowSize > 1024 && windowSize <= 1279) {
                var row = 3;
            } else if (1280 < windowSize) {
                var row = 4;
            } else {
                var row = 1;
            }
            // console.log(row);
            // console.log(windowSize);

            // console.log($(this).find('.serviceDetail').length);
            var start = 1;
            var end = row;
            var maxHeightH4 = 0;

            var max = parseInt($(this).find('.serviceDetail').length / row);
           // console.log("before", max);

            if (max > 0) {
                max = max + 1;
            }
           // console.log("after", max);
            $(this).find('h4').css('height', '');

            for (var i = 1; i <= max; i++) {
                //$(this).find('.serviceDetail').each(function(){
                $(this).find('.serviceDetail').each(function(index, element) {
                    index = index + 1;
                    if (index >= start && index <= end) {
                        maxHeightH4 = maxHeightH4 > $(this).find('h4').height() ? maxHeightH4 : $(this).find('h4').height();
                    }
                });

                $(this).find('.serviceDetail').each(function(index, element) {
                    index = index + 1;
                    if (index >= start && index <= end) {
                        $(this).find('h4').css({
                            'height': maxHeightH4
                        });
                    }
                });

                start = end + 1;
                end = end + row;
            }
        });        
	// }
    }
});
$(document).ready(function(){
      if ($('.checking').length > 0) {
        resize();

        function resize() {
            var i = 1;
            $('body .checking').each(function () {
                $(this).attr('id', 'tablenormal' + i).addClass('responsive_table');
                var j = 1;
                var arr = [];
                var arrBG = [];
                var vInsertAfter = '#tablenormal' + i;
                if ($('#tablenormal' + i + '  tr th').length > 0) {
                    $('#tablenormal' + i + '  tr').each(function () {
                        if (j == 1) {
                            var k = 0;
                            $('#tablenormal' + i + '  tr th').each(function () {
                                arr[k] = $(this).html();
                                arrBG[k] = $(this).css('background-color');
                                k++;
                            });

                        }
                        else {
                            var k = 0;
                            var vTr;
                            $('<table />', { 'class': 'responsive_table', 'id': 'tablemobile' + i + j }).insertAfter(vInsertAfter);
                            $(this).find('td').each(function () {

                               

                             
                                if($(this).attr("colspan")>0){
                                    var col=$(this).attr("colspan");
                                    $('<tr/>').append($('<td/>', { 'html': arr[k], 'style': 'background-color:' + arrBG[k] + ';font-weight:bold' })).append($('<td/>', { 'html': $(this).html() })).appendTo($('#tablemobile' + i + j)).find("td:last-child").attr({'rowspan' : col});
                                     k++;
                                    col=parseInt(col);
                                    col=col-1;
                                    
                                    for(var a=0;a<col;a++){
                                     $('<tr/>').append($('<td/>', { 'html': arr[k], 'style': 'background-color:' + arrBG[k] + ';font-weight:bold' })).appendTo($('#tablemobile' + i + j));
                                    k++;
                                    }
                                    
                                }else{
                                     $('<tr/>').append($('<td/>', { 'html': arr[k], 'style': 'background-color:' + arrBG[k] + ';font-weight:bold' })).append($('<td/>', { 'html': $(this).html() })).appendTo($('#tablemobile' + i + j));
                                     k++;
                                }

                            });
                            
                            vInsertAfter = '#tablemobile' + i + j;
                        }
                        j++;
                    });
                }
                else {
                    $('#tablenormal' + i + '  tr').each(function () {
                        var j = 0;
                            var k = 0;
                            var vTr;
                            $('<table />', { 'class': 'responsive_table noheader_table', 'id': 'tablemobile' + i + j }).insertAfter(vInsertAfter);
                            $(this).find('td').each(function () {
                                if ($(this).html().trim() != '&nbsp;')
                                {

                                    if (k / 2 == 0)
                                        $('<tr/>').append($('<td/>', { 'html': $(this).html(), 'style': 'background-color: #fafafa' })).appendTo($('#tablemobile' + i + j));
                                    else
                                        $('<tr/>').append($('<td/>', { 'html': $(this).html(), 'style': 'background-color:#eeeeee' })).appendTo($('#tablemobile' + i + j));

                                        k++;
                                }
                            });
                            vInsertAfter = '#tablemobile' + i + j;
                        j++;
                    });
                }
                i++;
            });

            $(window).on("load resize",function(e){
            if ($(window).width() <= 1023) {
                $("[id*='tablenormal']").hide();
                $("[id*='tablemobile']").show();

            }
            else {
                $("[id*='tablemobile']").hide();
                $("[id*='tablenormal']").show();
            }
          });

         
            $(window).on("load resize",function(e){
              $(".responsive_table tr:first-child").each(function() {
               $(this).addClass('blueBg')
               $(this).addClass('blueBg')
              });

            });

          

        }
};

  $(".responsive_table tr:first-child").each(function() {
   $(this).addClass('blueBg');
  });


});
