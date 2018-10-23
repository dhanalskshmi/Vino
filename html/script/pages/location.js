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
            console.log("before", max);

            if (max > 0) {
                max = max + 1;
            }
            console.log("after", max);
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