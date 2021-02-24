// Маска телефона

$('.phone-mask').inputmask('mask', {
  'mask': '+7 (999) 999 99 99'
});


// Ввод только чисел

$('.num').bind("change keyup input click", function() {
  if (this.value.match(/[^0-9]/g)) {
    this.value = this.value.replace(/[^0-9]/g, '');
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

$(document).ready(function() {
  blockBody();

  $('.pop-up__btn').click(function () {
    $('.first-pop-up-block').addClass('hide');
    blockBody();
  });

  $('.callback').click( function () {
    $('.call-pop-up-block').fadeIn(500);
    blockBody();
  });

  $('.c-pop-up__btn').click(function () {
    $('.call-pop-up').fadeOut(500, function () {
      $('.thanks-pop-up').fadeIn(500);
    });
  });

  $('.pop-up-cancel').click(function () {
    $('.call-pop-up-block').fadeOut(500);
    blockBody();
  })

  $('.thanks-pop-up__btn').click(function () {
    $('.call-pop-up-block').fadeOut(500);
    blockBody();
  })

  $('.call-pop-up-block').click(function(e) {
		if ($(e.target).closest('.call-pop-up').length == 0 && $(e.target).closest('.thanks-pop-up').length == 0) {
			$(this).fadeOut(500);
      blockBody();
		}
	});

  $('.dropdown__value').click(function () {

	  if ($(this).closest('.dropdown').hasClass('active')) {
	    $(this).closest('.dropdown').toggleClass('active');
	  } else {
	    $('.dropdown').removeClass('active');
	    $(this).closest('.dropdown').toggleClass('active');
	  }
	});

	$('.dropdown__list li').click(function () {
	  var value = $(this).text().trim();
	  $(this).closest('.dropdown').find('input').attr('value', value);
	  $(this).closest('.dropdown').find('.dropdown__value span').html(value);
	  $('.dropdown').removeClass('active');
	});

	$(document).mouseup(function (e) {

	  if (!$('.dropdown').is(e.target) && $('.dropdown').has(e.target).length === 0) {
	    $('.dropdown').removeClass('active');
	  }

	});


  var isReviewsAnimate = false;

  $('.mm-list__btn-list').click(function() {

    if (isReviewsAnimate) {
      return;
    } else {
      isReviewsAnimate = true;
    }

    if ($(this).hasClass('active')) {

      $(this).removeClass('active');
      $(this).closest('li').find('.mm-list__hidden-list').animate({
        height: 'hide'
      }, 400, function() {
        isReviewsAnimate = false;
      });

    } else if ($('.mm-list__btn-list').hasClass('active')) {

      $('.mm-list__btn-list').closest('ul').find('.mm-list__btn-list').removeClass('active');
      $('.mm-list__hidden-list').animate({
        height: 'hide'
      }, 400, function() {
        isReviewsAnimate = false;
      });

      $(this).addClass('active');
      $(this).closest('li').find('.mm-list__hidden-list').animate({
        height: 'show'
      }, 400, function() {
        isReviewsAnimate = false;
      });

    } else  {

      $(this).addClass('active');
      $(this).closest('li').find('.mm-list__hidden-list').animate({
        height: 'show'
      }, 400, function() {
        isReviewsAnimate = false;
      });

    }

  });

  if ($('.c-filter-list__filter-item').length && window.innerWidth > 1279) {

    var isFilterAnimate = false;

    $('.c-filter-list__filter-item').click(function() {

      if (isFilterAnimate) {
        return;
      } else {
        isFilterAnimate = true;
      }

      if ($(this).hasClass('active')) {

        $(this).removeClass('active');
        $(this).closest('li').find('.c-filter-list__hidden-list').animate({
          height: 'hide'
        }, 400, function() {
          isFilterAnimate = false;
        });

      } else {

        $(this).addClass('active');
        $(this).closest('li').find('.c-filter-list__hidden-list').animate({
          height: 'show'
        }, 400, function() {
          isFilterAnimate = false;
        });

      }

    });

  }

  $('.mob-header__menu').click(function () {
    $('.mob-menu').addClass('active');
    blockBody();
  });

  $('.mm-cancel').click(function () {
    $('.mob-menu').removeClass('active');
    blockBody();
  })

  $('.main-section__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: '.main-section__bg-slider'
  });

  $('.main-section__bg-slider').slick({
    asNavFor: '.main-section__slider',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    fade: true,
    cssEase: 'linear'
  })

  $('.i-news-section__slider').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          dots: false,
          arrows: false,
        }
      }
    ]
  });

  $('.i-exc-section__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    variableWidth: true,
    swipeToSlide: true,
    touchThreshold: 150,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          dots: false,
          arrows: true,
          autoplay: false
        }
      }
    ]
  });

  $('.i-insta-section__slider').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 650,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          dots: false,
          arrows: false
        }
      }
    ]
  });

  $('.i-blog-section__blog-block').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          autoplay: false
        }
      }
    ]
  });

  if ($('.p-card-reward-block__slider').length) {
    $('.p-card-reward-block__slider').slick({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    });
  }

  if ($('.tabs').length) {
    $('.tabs .tab').click(function() {

      var index = $(this).index();
      $('.tab.active').removeClass('active');
      $('.tab').eq(index).addClass('active');

      $('.item.active').removeClass('active');
      $('.item').eq(index).addClass('active');

    });
  }

  $('.text__img-block').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      }
    ]
  })

  $('.a-slider').slick({
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $('.ab-slider').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 650,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('.partner-slider').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: true,
          arrows: false,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 740,
        settings: {
          variableWidth: false,
          centerMode: false,
          adaptiveHeight: true,
          arrows: false
        }
      }
    ]
  });

  if ($('.mc-description-box__more-btn').length) {
    $('.mc-description-box__more-btn').click(function () {
      $('.mc-description-box__hidden-text').fadeIn(500, function() {
        $('.mc-description-box__more-btn').fadeOut(500)
      })
    })
  }

});

// Показать полный список параметров фильтра

if ($('.c-filter-hidden-list__more-btn').length && window.innerWidth > 1279) {

  $('.c-filter-hidden-list__more-btn').click(function() {

    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      var text = $(this).attr('data-changed-text');
      $(this).closest('.c-filter-list__hidden-list').find('ul').addClass('visible');
      $(this).find('span').html(text);
    } else {
      var text = $(this).attr('data-default-text');
      $(this).closest('.c-filter-list__hidden-list').find('ul').removeClass('visible');
      $(this).find('span').html(text);
    }

  });

}


// Очистить параметры фильтра

if ($('.c-filter-hidden-list__cancel').length && window.innerWidth > 1279) {

  $('.c-filter-hidden-list__cancel').click(function() {

    $(this).closest('li').find('input[type="checkbox"]').each(function() {
      if ($(this).prop('checked')) {
        $(this).click();
      }
    });

  });

}


// Выбор параметров в фильтре

if ($('.c-filter-container').length && window.innerWidth > 1279) {

  $('.c-filter-container input[type="checkbox"]').click(function() {

    var checked = $(this).prop('checked');
    var text = $(this).siblings('label').text().trim();

    if (checked) {

      var html =
        '<div class="c-catalog-filter-block-item">' +
        '<span>' + text + '</span>' +
        '<div class="c-catalog-filter-block__cancel">' +
        '<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5.83333L1.33333 8.5L0 7.16667L2.66667 4.5L0 1.83333L1.33333 0.5L4 3.16667L6.66667 0.5L8 1.83333L5.33333 4.5L8 7.16667L6.66667 8.5L4 5.83333Z" fill="#242E45"></path>' +
        '</svg>' +
        '</div>' +
        '</div>';

      $('.c-catalog-filter-block').prepend(html);

    } else {

      $('.c-catalog-filter-block>div').each(function() {
        var itemText = $(this).text().trim();
        if (itemText == text) {
          $(this).remove();
        }
      });

    }

    if ($('.c-catalog-filter-block>div').length > 3) {
      $('.c-catalog-filter-block__clear-all').addClass('active');
    } else {
      $('.c-catalog-filter-block__clear-all').removeClass('active');
    }

  });

  $(document).on('click', '.c-catalog-filter-block__cancel', function() {

    var text = $(this).closest('.c-catalog-filter-block-item').text().trim();

    $('.c-filter-container input[type="checkbox"]').each(function() {

      var labelText = $(this).siblings('label').text().trim();

      if (labelText == text) {
        $(this).prop('checked', false);
      }

    });

    $(this).closest('.c-catalog-filter-block-item').remove();

    if ($('.c-catalog-filter-block>div').length > 3) {
      $('.c-catalog-filter-block__clear-all').addClass('active');
    } else {
      $('.c-catalog-filter-block__clear-all').removeClass('active');
    }

  });

  $('.c-catalog-filter-block__clear-all').click(function() {
    $('.c-catalog-filter-block__cancel').click();
  });

  // Додавление подсказки при выборе параметра фильтра

  $('.c-filter-container__filter-list input').change(function() {

    var value = $(this).prop('checked');
    var block = $('.fulter-results-count');

    block.removeClass('bottle');

    if (value) {

      var label = $(this).closest('li').find('label');
      var offsetTop = label.offset().top;
      var offsetLeft = label.offset().left;
      var width = label.outerWidth();
      var height = label.outerHeight();

      block.css({
        top: (offsetTop + height) + 'px',
        left: (offsetLeft + width) + 'px'
      });

      block.addClass('active');

      if ($(this).closest('.checkbox-bottle-style').length) {
        block.addClass('bottle');
      }

    } else {
      block.removeClass('active');
    }

  });

  $(document).mouseup(function(e) {
    if (!$('.c-filter-container__filter-list input').is(e.target) && $('.c-filter-container__filter-list input').has(e.target).length === 0) {
      if (!$('.fulter-results-count').is(e.target) && $('.fulter-results-count').has(e.target).length === 0) {
        $('.fulter-results-count').removeClass('active');
      }
    }
  });

  $('.c-filter-list__hidden-list ul').scroll(function() {
    $('.fulter-results-count').removeClass('active');
  });

  $('.fulter-results-count__button').click(function () {
    $('.fulter-results-count').removeClass('active');
  });

}


// Поиск в фильтре

if ($('.c-filter-hidden-list__search').length) {

  $('.c-filter-hidden-list__search').on('input', function() {

    var value = $(this).val().trim().toLowerCase();
    var items = $(this).closest('li').find('ul li');

    items.each(function() {

      var text = $(this).text().toLowerCase().trim();

      if (text.indexOf(value) == -1) {
        $(this).addClass('hidden');
      } else {
        $(this).removeClass('hidden');
      }

    });

    if (items.not('.hidden').length == 0) {
      $(this).closest('li').find('.c-filter-hidden-list__clear').addClass('active');
    } else {
      $(this).closest('li').find('.c-filter-hidden-list__clear').removeClass('active');
    }

    if (value == '') {
      $(this).closest('.c-filter-list__hidden-list').removeClass('is-search');
    } else {
      $(this).closest('.c-filter-list__hidden-list').addClass('is-search');
    }

  });

}


// Фильтр в адаптиве

if ($('.filer-mob-menu').length && window.innerWidth < 1280) {

  $('.open-mob-filter').click(function() {
    blockBody();
    $('.c-filter-list__hidden-list').removeClass('active');
    $('.c-filter-container').addClass('active');
  });

  $('.open-mob-sorting').click(function() {
    blockBody();
    $('.c-filter-list__hidden-list').removeClass('active');
    $('.c-filter-container__mobile-sorting .c-filter-list__filter-item').click();
    $('.c-filter-container').addClass('active');
  });

  $('.c-filter-container__mob-header').swipe({
    swipe: function(event, direction, distance, duration, fingerCount) {
      if (direction == 'down') {
        blockBody();
        $('.c-filter-container').removeClass('active');
      }
    }
  });

  $('.c-filter-list__filter-item').click(function() {
    $(this).closest('li').find('.c-filter-list__hidden-list').addClass('active');
  });

  $('.c-filter-list__hidden-list-mob-header').click(function() {
    $(this).closest('.c-filter-list__hidden-list').removeClass('active');
  });

  $('.c-filter-container__mob-clear').click(function() {
    $('.c-filter-container__mobile-sorting li:first-child input').click();
    $('.c-filter-container input[type="checkbox"]').each(function() {
      $(this).prop('checked', false);
    });
  });

}


// Скрытие фильтра в адаптиве при клике на кнопку "Применить"

if ($('.filer-mob-menu').length && window.innerWidth < 1279) {

  $('.c-filter-container__apply').click(function() {
    blockBody();
    $('.c-filter-container').removeClass('active');
  });

}

// Форма поиска

if ($('.search-popup').length) {

  $('.header-search, .c-mob-nav-section__search').click(function() {
    blockBody();
    $('.search-popup').toggleClass('active');
  });

  $('.search-popup__close').click(function () {
    blockBody();
    $('.search-popup').removeClass('active');
  });

  $('.search-popup__search-input').focus(function() {
    $('.search-popup__results').addClass('active');
  });

  $('.search-popup__search-input').blur(function() {
    $('.search-popup__results').removeClass('active');
  });

  $('.search-popup__search-input').on('input', function() {

    var value = $(this).val().trim();

    if (value.length == 0) {
      $('.search-popup__results').removeClass('results-not-found');
    } else {
      $('.search-popup__results').addClass('results-not-found');
    }

  });

}


// Яндекс карта

if ($('#map').length) {

  ymaps.ready(init);

  function init() {

    var myMap3 = new ymaps.Map("map", {
      center: mapCoordsCenter,
      zoom: 16.5,
      controls: []
    });

    myGeoObject = new ymaps.GeoObject();

    myMap3.geoObjects
      .add(new ymaps.Placemark(mapCoords, {}, {
        iconLayout: 'default#image',
        iconImageHref: mapIcon,
        iconImageSize: [60, 69],
        iconImageOffset: [-30, -69]
      }));

  };

}
