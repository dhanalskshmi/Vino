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
                                $('<tr/>').append($('<td/>', { 'html': arr[k], 'style': 'background-color:' + arrBG[k] + ';font-weight:bold' })).append($('<td/>', { 'html': $(this).html() })).appendTo($('#tablemobile' + i + j));
                                k++;
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

          if ($(window).width() <= 767) {
            $(window).on("load resize",function(e){
              $(".responsive_table tr:first-child").each(function() {
               $(this).addClass('blueBg')
               $(this).addClass('blueBg')
              });

            });

          }

        }
};
if ($(window).width() <= 1023) {
  $(".responsive_table tr:first-child").each(function() {
   $(this).addClass('blueBg');
  });
}

});