// Маска телефона

$('.phone-mask').inputmask('mask', {
  'mask': '+7 (9999) 99-99-99',
  showMaskOnHover: false,
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
  $('.header').css('right', scrollWidth + 'px');
}

function blockBody() {

  if ($('html').hasClass('no-scroll')) {

    let scrollTop = $('html').attr('data-scroll');

    $('html').removeClass('no-scroll');
    $('html').attr('style', '');

    $('html').css('padding-right', 0 + 'px');
    $('.header').css('right', 0 + 'px');

    $(document).scrollTop(scrollTop);

  } else {
    bodyScroll();
    let scrollTop = $(document).scrollTop();

    $('html').addClass('no-scroll');
    $('html').css({
      top: '-' + scrollTop + 'px'
    });
    $('html').attr('data-scroll', scrollTop);

  }

}


// height viewport

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let vhr = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vhr', `${vhr}px`)

window.addEventListener('resize', () => {
  vhr = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vhr', `${vhr}px`);
});


// open mobile menu

$('.hamburger').on('click', function () {
  blockBody();
  $(this).toggleClass('active');
  $('.mob-menu-block').toggleClass('active');

  if ($(this).hasClass('active')) {
    $('.header').addClass('fill');
  } else {
    $(window).scroll();
  }
});


// header scroll

$(window).scroll(function () {
  var scroll = $(this).scrollTop();

  if ($('.modal-wrapper').hasClass('active') || $('.mob-menu-block').hasClass('active')) {
    return
  }

  if (scroll > 0) {
    $('.header').addClass('fill');
  } else {
    $('.header').removeClass('fill');
  }
});


// anchor link

$('.link-scroll, .header__nav a').on("click", function (event) {
  var id = $(this).attr('href');

  if (id[0] === '#') {
    event.preventDefault();


    if ($(this).closest('.mob-menu-block').length) {
      blockBody();
      $(this).closest('.mob-menu-block').removeClass('active');
      $('.hamburger').removeClass('active');
      $(window).scroll();
    }

    let number;

    if ($(window).outerWidth() < 750) {
      number = 60;
    } else if ($(window).outerWidth() > 750 || $(window).outerWidth() < 1270){
      number = 80;
    } else {
      number = 50;
    }

    console.log(number)

    var top = $(id).offset().top - number;

    $('body,html').animate({
      scrollTop: top
    }, 1000);
  }
});


// slider

if ($('.swiper-container').length) {
  const swiper = new Swiper('.reviews-slider', {
    loop: true,
    speed: 500,

    pagination: {
      el: '.slider-pag',
      clickable: true,
    },

    navigation: {
      prevEl: '.reviews-prev',
      nextEl: '.reviews-next',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 5
      },
      751: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        centeredSlides: true,
        spaceBetween: 20
      },
      1271: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 60,
      },
    }
  });

  const partnerSlider = new Swiper('.partner-slider', {
    loop: true,
    speed: 500,

    navigation: {
      prevEl: '.partner-prev',
      nextEl: '.partner-next',
    },

    breakpoints: {
      0: {
        slidesPerView: 2.2,
        centeredSlides: true,
        slidesPerGroup: 1,
        spaceBetween: 15
      },
      751: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        centeredSlides: true,
        spaceBetween: 20
      },
      1271: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 41,
      },
    }
  });
}


// form animation

$('.input-box').find('input').on('focus', function () {
  $(this).closest('.input-box').find('label').addClass('active');
});

$('.input-box').find('input').on('blur', function () {
  if ($(this).val().trim().length == 0) {
    $(this).closest('.input-box').find('label').removeClass('active');
  }
});


// validation

$('input[type="submit"]').on('click', function (e) {
  e.preventDefault();

  $(this).closest('form').find('input').each(function () {
    phone = $(this).closest('form').find('.phone-mask');
    input = $(this);

    if (!phone.inputmask('isComplete')) {
      phone.parent().addClass('no-valid');
    }

    if (input.val().trim().length == 0) {
      input.parent().addClass('no-valid');
    }
  })
});

$('input').on('input', function () {
  $(this).parent().removeClass('no-valid');
});


// open/close modal

$('input[type="submit"]').on('click', function (e) {
  e.preventDefault();

  if (!($(this).closest('form').find('.input-box').hasClass('no-valid'))) {
    blockBody();
    $('.thanks-modal').addClass('active');
  }
});

$('.modal-close').on('click', function () {
  blockBody();
  $(this).closest('.modal-wrapper').removeClass('active');
});

$('.modal-wrapper').on('click', function (e) {
  if ($(e.target).closest('.modal').length == 0) {
    blockBody();
    $(this).removeClass('active');
  }
});


// map

if ($(window).outerWidth() > 1270) {
  let formHeight = $('.form').outerHeight();
  $('.map').height(formHeight);
}




// general

$(window).on('load', function () {
  setTimeout(function () {
    $('.modal-wrapper').removeClass('hide');
  }, 400);
})
