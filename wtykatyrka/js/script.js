
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

function blockBody() {

  if ($('body').hasClass('no-scroll')) {

    let scrollTop = $('body').attr('data-scroll');


    $('body').removeClass('no-scroll');
    $('body').attr('style', '');

    $(document).scrollTop(scrollTop);

  } else {

    let scrollTop = $(document).scrollTop();
    $('body').addClass('no-scroll');
    $('body').css({
      top: '-' + scrollTop + 'px'
    });
    $('body').attr('data-scroll', scrollTop);

  }
}

//белый хедер
$(document).scroll(function() {
  var scrollTop = $('body, html').scrollTop();
  if (scrollTop > 100) {
    $('header').addClass('white');
  } else {
    if ($('body').hasClass('no-scroll')) {

    } else {
      $('header').removeClass('white')
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
    top = $(block_id).offset().top - 117;
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