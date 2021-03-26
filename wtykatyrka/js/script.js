
$('.nav-toggle').click(function() {
  $(this).toggleClass('opened');
  if ($(window).innerWidth() < 1280) {
    $('.mobile_menu').toggleClass('active');
    blockBody();
  } else {
    $(this).closest('header').find('.header__pc-menu').toggleClass('active')
  }
});

$('.header__pc-menu-nav a').click(function() {
  $(this).closest('header').find('.nav-toggle').click();
})

$(document).on('mouseup', function (e) {
  if ($(window).innerWidth() > 1280) {
    var div = $(".header__pc-menu.active");
    var anotherDiv = $('.nav-toggle')
    if (!div.is(e.target) && div.has(e.target).length === 0 && !anotherDiv.is(e.target) && anotherDiv.has(e.target).length === 0) {
      div.removeClass('active');
      $(this).find('.nav-toggle').removeClass('opened');
    }
  }
});

// Блокировка скроллинга Body

var scrollWidth;

function getScrollBarWidth() {
  let $divs = $('<div class="div1" style="width: 100vw; overflow-y: scroll;"><div class="div2" style="width: 100%;"></div></div>');

  $('body').append($divs);

  let width1 = $('.div1').width(),
  width2 = $('.div2').width();

  scrollWidth = width1 - width2;
  $divs.remove();
}

getScrollBarWidth();

function bodyScroll() {
  $('html').css('padding-right', scrollWidth + 'px');
  $('header').css('padding-right', scrollWidth + 'px');
}

function blockBody() {

  if ($('html').hasClass('no-scroll')) {
    let scrollTop = $('html').attr('data-scroll');

    $('html').css('padding-right', 0);
    $('header').css('padding-right', 0);

    $('html').removeClass('no-scroll');
    $('html').attr('style', '');

    $(document).scrollTop(scrollTop);
  } else {
    let scrollTop = $(document).scrollTop();

    bodyScroll();

    $('html').addClass('no-scroll');
    $('html').css({
      top: '-' + scrollTop + 'px'
    });
    $('html').attr('data-scroll', scrollTop);
  }
}

//белый хедер
$(document).scroll(function() {
  var scrollTop = $('body, html').scrollTop();
  if (scrollTop > 100) {
    $('header .content').addClass('white');
  } else {
    if ($('html').hasClass('no-scroll')) {

    } else {
      $('header .content').removeClass('white')
    }
  }
})

$(document).ready(function() {
  $('body, html').scroll();
  if ($('.hidden_text').height() <= 170) {
    $('.editor_acord').addClass('active');
    $('.button_acord').remove();
  }
})


//плавный переход по якорям

$(document).on("click",".anchor_link", function (event) {
  event.preventDefault();
  if ($('.mobile_menu').hasClass('active')) {
    $('.mobile_menu').removeClass('active');
    $('.nav-toggle').removeClass('opened');
    blockBody();
  }
  var block_id = $(this).attr('href');
  var top;
  if ($(window).innerWidth < 1280) {
    top = $(block_id).offset().top - 117;
  } else {
    top = $(block_id).offset().top - 97;
  }
  $('body,html').animate({scrollTop: top}, 1500);
});

//открытие/закрытие акордеона
$('.button_acord').click(function() {
  $(this).toggleClass('active');
  var editorHeight = $(this).closest('.accordeon_block').find('.hidden_text').height();
  if ($(this).closest('.accordeon_block').find('.editor_acord').hasClass('active')) {
    $(this).closest('.accordeon_block').find('.editor_acord').removeClass('active').css('height', '170px');
  } else {
    $(this).closest('.accordeon_block').find('.editor_acord').css('height', editorHeight).addClass('active');
  }
});



//валидация формы
$('.submit').click(function() {
  event.preventDefault();
  $(this).closest('form').find('input').each(function() {
    var inputText = $(this).val();
    if (inputText.length < 1) {
      $(this).addClass('notValid');
      $('form').removeClass('active')
    } else if(!$(this).hasClass('submit')) {
      $(this).addClass('Valid');
    }
  });
  if ($('.notValid').length) {
    return;
  } else {
    $('form').addClass('active');
  }
  if ($('form').hasClass('active')) {
    $('.thanks-modal').addClass('active');
    blockBody();
    $('.Valid').val('');
  }
})

$('input').keyup(function() {
  $(this).removeClass('notValid');
})

// закрытие модалки
$('.modal-close').on('click', function () {
  blockBody();
  $('form').removeClass('active')
  $(this).closest('.modal-wrapper').removeClass('active');
});

//карта
function BuildMap() {
  if ($('.map_col').length) {
    // карта с адресом первого таба
    ymaps.ready(init);
    function init () {
      var myMap = new ymaps.Map("map_col", {
        center: mapCenter,
        zoom:  14,
        controls: []
      });
      myMap.controls.add('fullscreenControl',{float: 'left'});
      for (var i = 0; i<mapPoints.length; i++){
       myGeoObject = new ymaps.GeoObject();
       myMap.geoObjects
       .add(new ymaps.Placemark(mapPoints[i], {}, {
        iconLayout: 'default#image',
        iconImageHref: mapPointImages,
        iconImageSize: mapPointImagesSize,
        iconImageOffset: mapPointImagesOffset,
      }));
     }
   };
 }
}

// $(document).ready(function() {
//   BuildMap();
// });




function animation(scrollTop) {

  $('.animation').not('.animated').each(function () {

    var offsetTop = $(this).offset().top + 50;
    var windowHeight = window.innerHeight;

    if ((scrollTop + windowHeight) > offsetTop) {
      $(this).addClass('animated');
    }
  });

}

$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  animation(scrollTop);
});

$(document).ready(function() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');

  let vhr = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vhr', vhr + 'px')

  window.addEventListener('resize', () => {
    vhr = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vhr', vhr + 'px');
  });
})
