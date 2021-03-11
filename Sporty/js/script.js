// Маска телефона

$('.phone-mask').inputmask('mask', {
  'mask': '+38 999 999 99 99'
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


// dropdown

var dropdown = $('.dropdown');

if (dropdown.length) {
  dropdown.each(function () {
    var attrValue = $(this).attr('data-value').trim();

    $(this).find('.btn p').text(attrValue);
    $(this).find('.dropdown-value').val(attrValue);
  });
}

if ($(window).width() <= 1250 && $(window).width() > 750) {

  dropdown.find('.btn').on('click', function () {
    $(this).closest('.dropdown').toggleClass('active');
  });

}

$('.dropdown-list li').on('click', function () {
  var listValue = $(this).text().trim();

  $(this).closest('.dropdown').find('.dropdown-value').val(listValue);
  $(this).closest('.dropdown').find('.btn p').text(listValue);
  $(this).closest('.dropdown').removeClass('active');
});


// header

if ($(window).width() <= 750) {
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();

    if ($('.mob-menu-block').hasClass('active') || $('.modal-wrapper').hasClass('active') || $('.filter').hasClass('active')) {
      return;
    }

    if (scroll > 0) {
      $('.header').addClass('fill');
    } else {
      $('.header').removeClass('fill');
    }
  });
}



// mob menu

$('.header__hamburger').on('click', function () {
  if ($('.modal-wrapper').hasClass('active')) {

    blockBody();

    $(this).removeClass('active');
    $('.header__social-list').removeClass('hide');
    $('.modal-wrapper').removeClass('active');

    $('body').css('padding-right', 0);
    $('.header').css('right', 0);

  } else {

    $(this).toggleClass('active');
    $('.mob-menu-block').toggleClass('active');
    $('.header__social-list').toggleClass('hide');
    blockBody();

  }
});


// anchor

$('.link-scroll').on("click", function (event) {
  event.preventDefault();

  if ($(this).closest('.mob-menu-block.active').length) {
    $(this).closest('.mob-menu-block.active').removeClass('active');
    blockBody();
  }

  var number;

  if ($(window).width() < 751) {
    number = 50;
  } else {
    number = -5;
  }

  var id = $(this).attr('href');
  var top = $(id).offset().top - number;

  $('body,html').animate({
    scrollTop: top
  }, 1000);
});


// slider - slider section

$('.slider').slick({
  dots: true,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  fade: true,
  cssEase: 'linear',
  pauseOnFocus: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  touchMove: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 700,
  asNavFor: '.small-slider'
});

$('.small-slider').slick({
  dots: false,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  fade: true,
  cssEase: 'linear',
  pauseOnFocus: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  speed: 700,
  variableWidth: true,
  asNavFor: '.slider'
});

$('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
  $('.arrow-for-slider').removeClass('active').innerWidth();
  $('.small-slide-arrow').removeClass('active').innerWidth();

  $('.arrow-for-slider').addClass('active');
  $('.small-slide-arrow').addClass('active');
});

$(document).ready(function () {
  $('.arrow-for-slider').addClass('active');
  $('.small-slide-arrow').addClass('active');
})


// JSON animation

let animationElement1 = document.getElementById('animation1');
let animationElement2 = document.getElementById('animation2');
let animationElement3 = document.getElementById('animation3');

lottie.loadAnimation({
  container: animationElement1,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_1.json'
});

lottie.loadAnimation({
  container: animationElement2,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_2.json'
});

lottie.loadAnimation({
  container: animationElement3,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_3.json'
});


// catalog sort

$('.sort-country__btn').on('click', function () {
  $(this).closest('.sort-country').find('.sort-country__btn').removeClass('active');
  $(this).addClass('active');
});

$('.product-sort__cancel').on('click', function () {
  $(this).closest('.product-sort').find('.dropdown').each(function () {
    let dropdownDefaultVal = $(this).attr('data-value').trim();

    $(this).find('.dropdown-value').val(dropdownDefaultVal);
    $(this).find('.btn p').text(dropdownDefaultVal);
  });
});


// more catalog

$('.catalog__more-btn').on('click', function () {
  if ($('.hidden-catalog').length) {
    $(this).closest('.catalog-block').find('.hidden-catalog').fadeIn(700);
  }
})


// height viewport

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let vhr = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vhr', `${vhr}px`)

window.addEventListener('resize', () => {
  vhr = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vhr', `${vhr}px`);
});


// modal settings

var maxHeigthBox = Math.max.apply(Math, $('.modal__items').find('.item').map(function(){ return $(this).outerHeight(); }).get());
$('.modal__items').height(maxHeigthBox);

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
  $('body').css('padding-right', scrollWidth + 'px');
  $('.header').css('right', scrollWidth + 'px');
}

$('.open-video-modal').on('click', function () {
  blockBody();
  bodyScroll();
  $('.video-modal').addClass('active');

  if ($(window).width() <= 750) {
    $('.header__hamburger').addClass('active');
    $('.header__social-list').addClass('hide');
  }
});

$('.open-product-modal').on('click', function () {
  blockBody();
  bodyScroll();
  $('.product-modal').addClass('active');
});

if ($(window).width() <= 1199) {
  $('.mob-open-product-modal').on('click', function () {
    blockBody();
    bodyScroll();

    $('.product-modal').addClass('active');
    $('.header__hamburger').addClass('active');
    $('.header__social-list').addClass('hide');
  });
}


// close modal

$('.modal-close').on('click', function () {
  blockBody();

  $('body').css('padding-right', 0);
  $('.header').css('right', 0);

  $(this).closest('.modal-wrapper').removeClass('active');

  if ($(window).width() <= 750) {
    $('.header__hamburger').removeClass('active');
    $('.header__social-list').removeClass('hide');
  }
});

if ($(window).width() > 750) {
  $('.modal-wrapper').on('click', function (e) {
    if ($(e.target).closest('.modal').length == 0) {
      blockBody();

      $('body').css('padding-right', 0);
      $('.header').css('right', 0);

      $(this).removeClass('active');
    }
  });
}


// modal input settings and tabs changes

$('.modal__input input').on('input', function () {
  $(this).removeClass('no-valid');
})

$('.modal__input input').on('blur', function () {
  var inputText = $(this).val().trim().length;

  if (inputText > 0) {
    $(this).closest('.modal__input').find('label').addClass('hide');
  } else {
    $(this).closest('.modal__input').find('label').removeClass('hide');
  }
});

$('.modal__btn input').on('click', function (event) {
  event.preventDefault();

  if ($(this).hasClass('form')) {

    $(this).closest('form').find('.modal__input').each(function () {
      var inputValueLength = $(this).find('input').val().trim().length;

      if (inputValueLength < 1) {
        $(this).find('input').addClass('no-valid');
      }
    });

    var noValidInput = $(this).closest('form').find('.modal__input').find('.no-valid').length;

    if (noValidInput == 0) {
      $(this).closest('.modal-wrapper').removeClass('active');
      $('.thanks-modal').addClass('active');
    }

  } else {

    $(this).closest('.modal__content').find('.items').each(function () {
      var nextItem = $(this).find('.item.active').next();

      $(this).find('.item').removeClass('active');
      nextItem.addClass('active');
    });

    $(this).addClass('form');
    $(this).closest('.modal__content').find('.modal__top-back-box').addClass('active');

  }
});

$('.modal__to-back').on('click', function () {
  $(this).closest('.modal__content').find('.items').each(function () {
    var prevItem = $(this).find('.item.active').prev();

    $(this).find('.item').removeClass('active');
    prevItem.addClass('active');
  });

  $(this).closest('.modal__content').find('.modal__btn input').removeClass('form');
  $(this).closest('.modal__top-back-box').removeClass('active');
});

// scroll animation

function animation(scrollTop) {

  $('.animation').not('.animated').each(function () {

    var offsetTop = $(this).offset().top - 50;
    var windowHeight = window.innerHeight;

    if ((scrollTop + windowHeight) > offsetTop) {
      $(this).addClass('animated');
    }
  });

}


// mobile filter

let getFilterHeader = $('.filter-header__header')
let filterName = getFilterHeader.attr('data-filter-name').trim();

getFilterHeader.text(filterName);

$('.filte-btn').on('click', function () {
  blockBody();
  $('.filter').addClass('active');
});

$('.filter-close').on('click', function () {
  blockBody();
  $(this).closest('.filter').removeClass('active');
});

$('.filter-tab').on('click', function () {
  $('.filter-reset-btn').addClass('hide-btn');
  $(this).closest('.filter-tab-box').find('.filter-list-block').addClass('active');
  $('.filter-header__close-btn').addClass('hide-btn');
  $('.filter-header__back-arrow').removeClass('hide-btn');
});

$('.to-back').on('click', function () {
  $('.filter-list-block.active').removeClass('active');
  $('.filter-header__close-btn').removeClass('hide-btn');
  $('.filter-header__back-arrow').addClass('hide-btn');

  if ($('.filter-reset-btn').hasClass('active-btn')) {
    $('.filter-reset-btn').removeClass('hide-btn');
  }
});

$('.filter-list-block input[type="checkbox"]').change(function () {
  var isActiveCheckboxes = $('.checkbox-block input[type="checkbox"]:checked').length ? true : false;

  if (isActiveCheckboxes) {
    $('.filter-reset-btn').addClass('active-btn');
  } else {
    $('.filter-reset-btn').removeClass('active-btn');
  }
});

$('.filter-reset-btn').on('click', function () {
  $('.filter-reset-btn').addClass('hide-btn');
});





$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  animation(scrollTop);
});

$(window).on('load', function () {
  setTimeout(function () {
    $('.modal-wrapper').removeClass('hide');
  }, 400);

  $(window).scroll();
});


// var lineLenght = $('.line').get(0).getTotalLength();
// console.log (lineLenght);