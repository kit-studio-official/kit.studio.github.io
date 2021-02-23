// Маска телефона

$('.phone-mask').inputmask('mask', {
  'mask': '+7 999 999 9999',
  showMaskOnHover: false
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

// header pc menu open/close

if ($(window).width() > 1250) {
  $(document).on('mouseup', function (e) {
    var div = $(".header__pc-menu.active");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.removeClass('active');
      $(this).find('.header__menu-open').removeClass('active');
    }
  });

  $('.header__menu-btn-open').on('click', function () {
    $('.header__pc-menu').addClass('active');
    $(this).closest('.header__menu-open').addClass('active');
  });

  $('.header__menu-btn-close').on('click', function () {
    $('.header__pc-menu').removeClass('active');
    $(this).closest('.header__menu-open').removeClass('active');
  });
}


// mob menu open

if ($(window).width() <= 1250) {
  $(document).on('mouseup', function (e) {
    var div = $(".mob-menu");
    var header = $('.header');
    if (!div.is(e.target) && div.has(e.target).length === 0 &&!header.is(e.target) && header.has(e.target).length === 0) {
      blockBody();
      div.closest('.mob-menu-block').removeClass('active');
      $(this).find('.header__menu-open').removeClass('active');
      $('.header').removeClass('light');
    }
  });

  $('.header__menu-btn-open').on('click', function () {
    blockBody();
    $('.mob-menu-block').addClass('active');
    $(this).closest('.header__menu-open').addClass('active');
    $('.header').addClass('light');
  });

  $('.header__menu-btn-close').on('click', function () {
    blockBody();
    $('.mob-menu-block').removeClass('active');
    $(this).closest('.header__menu-open').removeClass('active');
    $('.header').removeClass('light');
  });
}




// anchor scroll

$(document).ready(function () {
  $('.link-scroll').on("click", function (event) {
    event.preventDefault();

    var id = $(this).attr('href');
    var top = $(id).offset().top - 50;

    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });
});


// header scroll

$(window).scroll(function () {
  var scroll = $(this).scrollTop();
  var scrollNumber;

  if ($(window).width() > 750) {
    scrollNumber = 300;
  } else {
    scrollNumber = 150;
  }

  var howItWorksScrollTop = $('.how-it-works-section').offset().top - scrollNumber;

  if (scroll > howItWorksScrollTop) {
    $('.header').addClass('fill');
  } else {
    $('.header').removeClass('fill');
  }

});


// height viewport


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vhr = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vhr', `${vhr}px`);
});


// tabs animation

$('.tabs-box').each(function () {
  var tabLength = $(this).find('.tab').length;

  if ($(this).closest('.tabs-block').find('.tabs-pagination').length) {
    for (var i = 1; i < tabLength; i++) {
      $('.tabs-pag.active').clone().removeClass('active').appendTo('.tabs-pagination');
    }
  }
});

$(window).on('load', function () {
  $('.tabs-block').each(function () {
    var maxTabItem = Math.max.apply(Math, $(this).find('.item').map(function(){ return $(this).height(); }).get());
    var activeItem = $(this).find('.item.active');
    var activeItemHeight = activeItem.height();

    if ($(window).width() > 1250 && $(this).closest('.how-works__tabs-block').length) {

      $(this).find('.items').height(maxTabItem);

    } else if (($(window).width() <= 1250) && ($(window).width() > 750) && $(this).closest('.how-works__tabs-block').length) {

      $(this).find('.items').height(activeItemHeight);

    }
  });

  $('.tabs-box').each(function () {
    var tabsBoxWeight =$(this).width();
    var tabLength = $(this).find('.tab').length;
    var bgForTab = $(this).find('.tabs__bg');
    var offsetBgFotTab =  bgForTab.offset().left;
    var activeTab = $(this).find('.tab.active');
    var activeTabWidth = activeTab.width();

    if ($(window).width() <= 750 && $(this).closest('.travels__tabs-block').length) {
      bgForTab.css('width', activeTabWidth)
    } else {
      bgForTab.css('width', tabsBoxWeight / tabLength);
    }

    bgForTab.attr('data-offset', offsetBgFotTab);
  });
});

$('.tab').on('click', function () {
  var tabIndex = $(this).index();
  var offsetTab = $(this).offset().left;
  var parent = $(this).closest('.tabs-block');
  var offsetBgFotTab =  parent.find('.tabs__bg').attr('data-offset');
  var transformNumber = offsetTab - offsetBgFotTab;

  parent.find('.tab').removeClass('active');
  $(this).addClass('active');

  parent.find('.tabs__bg').css('transform', 'translate3d(' + transformNumber + 'px, 0, 0)');

  if (($(window).width() <= 750) && $(this).closest('.travels__tabs-block').length) {
    var activeTabWidth = $(this).width();

    parent.find('.tabs__bg').css('width', activeTabWidth);
  }


  parent.find('.item').removeClass('active');

  if (parent.find('.items').length > 1) {

    parent.find('.items').each(function () {
      $(this).find('.item').eq(tabIndex).addClass('active');
    });

  } else {
    parent.find('.item').eq(tabIndex).addClass('active');
  }


  if ($(window).width() <= 1250 && $(this).closest('.how-works__tabs-block').length) {
    var heightNewTab = parent.find('.item').eq(tabIndex).height();
    parent.find('.items').height(heightNewTab);
  }

  parent.find('.tabs-pag').removeClass('active');
  parent.find('.tabs-pag').eq(tabIndex).addClass('active');
})


$('.tabs-pag').on('click', function () {
  var tabIndex = $(this).index();
  var offsetTab = $(this).closest('.tabs-block').find('.tab').eq(tabIndex).offset().left;
  var parent = $(this).closest('.tabs-block');
  var offsetBgFotTab =  parent.find('.tabs__bg').attr('data-offset');
  var transformNumber = offsetTab - offsetBgFotTab;

  parent.find('.tabs__bg').css('transform', 'translate3d(' + transformNumber + 'px, 0, 0)');

  parent.find('.tab').removeClass('active');
  parent.find('.tab').eq(tabIndex).addClass('active');

  parent.find('.item').removeClass('active');
  parent.find('.item').eq(tabIndex).addClass('active');

  if ($(window).width() <= 1250 && $(this).closest('.how-works__tabs-block').length) {
    var heightNewTab = parent.find('.item').eq(tabIndex).height();
    parent.find('.items').height(heightNewTab);
  }

  parent.find('.tabs-pag').removeClass('active');
  $(this).addClass('active');
});


// travels radio buttons

$(window).on('load', function () {
  $('.travels__btns-box').each(function () {
    var tabsBoxWeight =$(this).width();
    var tabLength = $(this).find('.travels__btn').length;
    var bgForTab = $(this).find('.travels__btn-bg');
    var offsetBgFotTab =  bgForTab.offset().left;

    bgForTab.css('width', tabsBoxWeight / tabLength);
    bgForTab.attr('data-offset', offsetBgFotTab);
  });
})

$('.travels__btn').on('click', function () {
  var offsetTab = $(this).offset().left;
  var parent = $(this).closest('.travels__btns-box');
  var offsetBgFotTab =  parent.find('.travels__btn-bg').attr('data-offset');
  var transformNumber = offsetTab - offsetBgFotTab;

  parent.find('.travels__btn-bg').css('transform', 'translate3d(' + transformNumber + 'px, 0, 0)');

  parent.find('.travels__btn').removeClass('active');
  $(this).addClass('active');

  var tabItems = $(this).closest('.tabs-block').find('.item');

  if (tabItems.hasClass('visit')) {
    tabItems.removeClass('visit').addClass('experience');
  } else if (tabItems.hasClass('experience')) {
    tabItems.removeClass('experience').addClass('visit');
  }
});


// accordion in tab's items

$('.item-content__accordion').each(function () {
  if ($(this).hasClass('active')) {
    $(this).find('.item-content__accordion-content').fadeIn(0);
  }
})

$('.item-content__accordion-btn').on('click', function () {
  var accordion = $(this).closest('.item-content__accordion');
  var accordionContainer = $(this).closest('.item-content__text-block');

  accordionContainer.find('.item-content__accordion').removeClass('active');
  accordionContainer.find('.item-content__accordion-content').slideUp(400);

  accordion.addClass('active');
  accordion.find('.item-content__accordion-content').slideDown(400);
});


// calendar

$('.date-input').datepicker({
  dateFormat: 'dd/mm/yyyy',
  minDate: new Date(),
  autoClose: true
})

$('.date-input').data('datepicker')


// dropdown

$('.form__dropdown-value').on('click', function () {
  $(this).closest('.form__dropdown').toggleClass('active');
})

$('.form__dropdown-list li').on('click', function () {
  let listItemValue = $(this).text().trim();
  let dropdownBox = $(this).closest('.form__dropdown');

  dropdownBox.find('input').val(listItemValue);
  dropdownBox.find('.form__dropdown-value strong').html(listItemValue);
  dropdownBox.removeClass('active');
})

$(document).on('mouseup', function (e) {
  var div = $(".form__dropdown.active");
  if (!div.is(e.target) && div.has(e.target).length === 0) {
    div.removeClass('active');
  }
});


// textarea resize

$('textarea').on('input', function (e) {
  this.style.height = '1px';
  this.style.height = (this.scrollHeight + 2) + 'px';
});


// modal window

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


$('.open-modal').on('click', function () {
  bodyScroll();
  blockBody();
  $('.form-modal').addClass('active');
});


$('.modal-close').on('click', function () {
  blockBody();

  $('body').css('padding-right', 0);
  $('.header').css('right', 0);

  $(this).closest('.modal-wrapper').removeClass('active');
});


$('.modal-wrapper').on('click', function (e) {
  if ($(e.target).closest('.modal').length == 0) {
    blockBody();

    $('body').css('padding-right', 0);
    $('.header').css('right', 0);

    $(this).removeClass('active');
  }
});


$('.open-thanks').on('click', function (e) {
  e.preventDefault();

  if ($(this).closest('.modal-wrapper').length) {
    $(this).closest('.modal-wrapper').removeClass('active')
  } else {
    bodyScroll();
    blockBody();
  }

  $('.thanks-modal').addClass('active')
})


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
