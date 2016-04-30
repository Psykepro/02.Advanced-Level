(function($) {

  $.fn.menumaker = function(options) {
      
      var navHeader = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        navHeader.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          navHeader.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            navHeader.find(".has-sub").prepend('<span class="submenu-button"></span>');
            navHeader.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else navHeader.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          navHeader.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = navHeader.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          navHeader.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) navHeader.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            navHeader.find('ul').show();
            navHeader.removeClass('small-screen');
            if (settings.format === 'select') {
              navHeader.find('select').hide();
            }
            else {
              navHeader.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !navHeader.hasClass("small-screen")) {
            navHeader.find('ul').hide().removeClass('open');
            navHeader.addClass('small-screen');
            if (settings.format === 'select') {
              navHeader.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(document).ready(function() {
  $("#nav-header").menumaker({
    title: "Menu",
    format: "dropdown"
  });

  $("#nav-header a").each(function() {
  	var linkTitle = $(this).text();
  	$(this).attr('data-title', linkTitle);
  });
});

});
})(jQuery);
