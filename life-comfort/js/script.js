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

    $('html').css('padding-right', 0);
    $('.header').css('right', 0);

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


// height viewport

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let vhr = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vhr', `${vhr}px`)

window.addEventListener('resize', () => {
  vhr = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vhr', `${vhr}px`);
});


// scroll animation

function animation(scrollTop) {
  $('.animation').not('.animated').each(function () {
    var offsetTop = $(this).offset().top - 150;
    var windowHeight = window.innerHeight;

    if ((scrollTop + windowHeight) > offsetTop) {
      $(this).addClass('animated');
    }
  });
}

$(window).on('load', function () {
  $('.numbers-list strong').each(function () {
    var $this = $(this);
    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 1500,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  });
});


// hamburger

$('.hamburger').on('click', function () {
  blockBody();
  $(this).toggleClass('active');
  $('.mob-menu-block').toggleClass('active');

  if ($('.header').hasClass('fill')) {
    $(window).scroll();
  } else {
    $('.header').addClass('fill');
  }
});


// anchor scroll

$('.scroll-link').on("click", function (event) {
  event.preventDefault();

  var id = $(this).attr('href');
  var top = $(id).offset().top - 100;

  $('body,html').animate({
    scrollTop: top
  }, 1000);
});


// header scroll

$(window).scroll(function () {
  var scroll = $(this).scrollTop();
  var scrollNumber;

  if ($('.mob-menu-block').hasClass('active')) {
    return;
  }

  if (scroll > 0) {
    $('.header').addClass('fill');
  } else {
    $('.header').removeClass('fill');
  }
});


// slider

const swiper = new Swiper('.news-slider', {
  loop: true,
  speed: 500,

  navigation: {
    nextEl: '.news-next',
    prevEl: '.news-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20
    },
    751: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20
    },
    1251: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 45,
    },
  }
});


const awardsSwiper = new Swiper('.awards-slider', {
  loop: true,
  speed: 500,

  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      navigation: false,
    },
    751: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
      navigation: false,
    },
    1251: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 55,
      navigation: {
        nextEl: '.awards-next',
        prevEl: '.awards-prev',
      },
    }
  }
});


const objectsSwiper = new Swiper('.object-slider', {
  speed: 500,
  navigation: {
    nextEl: '.object-next',
    prevEl: '.object-prev',
  },
  pagination: {
    el: '.object-slider__pag',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    751: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
    },
    1251: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 55,
    }
  }
});


// mob menu

let mobMenuListAnimation = false;

$('.header__nav > ul > li > p').on('click', function () {
  let list = $(this).closest('li').find('ul');

  if (!mobMenuListAnimation) {
    mobMenuListAnimation = true;

    setTimeout(function () {
      mobMenuListAnimation = false;
    }, 500)

    if (list.hasClass('active') && list.length) {

      list.slideUp(500);
      list.removeClass('active');

    } else if (list.length) {

      $(this).closest('ul').find('li > ul').slideUp(500);
      $(this).closest('ul').find('li > ul').removeClass('active').outerWidth();

      list.slideDown(500);
      list.addClass('active');
    }
  }
});




$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  animation(scrollTop);
});


$(window).on('load', function () {
  $(window).scroll();
});

