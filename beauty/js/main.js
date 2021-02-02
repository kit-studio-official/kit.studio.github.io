$('.header-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: '<button type="button" class="prev arrows"></button>',
  nextArrow: '<button type="button" class="next arrows"></button>',
  dots: true,
  dotsClass: 'dots',
  asNavFor: '.bg-slider',
  responsive: [{
    breakpoint: 740,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
  }]
});

$('.bg-slider').slick({
  fade: true,
  arrows: false,
  swipe: false,
  draggable: false
});

$('.catalog-slider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: '<button type="button" class="prev arrows main-arrow-prev main-arrows"></button>',
  nextArrow: '<button type="button" class="next arrows main-arrow-next main-arrows"></button>',
  responsive: [{
    breakpoint: 1280,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 740,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});

$('.blog-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: '<button type="button" class="prev arrows main-arrow-prev main-arrows"></button>',
  nextArrow: '<button type="button" class="next arrows main-arrow-next main-arrows"></button>',
  responsive: [{
    breakpoint: 1280,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  },
  {
    breakpoint: 740,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});

var isAnimate = false;

$(".item").not(":first").hide();
$('.tab-box .tab').click(function() {

  if (isAnimate) {
    return;
  } else {
    isAnimate = true;
  }

  var index = $(this).index();
  $('.tab.active').removeClass('active');

  $('.item.active').animate({
    opacity: 'hide'
  }, 350, function() {
    $(this).removeClass('active');
    $('.tab').eq(index).addClass('active');

    $('.item').eq(index).animate({
      opacity: 'show'
    }, 350, function() {
      $(this).addClass('active');

      isAnimate = false;

    });
  });
});

// product -- more btn

var isReviewsAnimate = false;

$('.p-review-more-btn').click(function() {

  if (isReviewsAnimate) {
    return;
  } else {
    isReviewsAnimate = true;
  }

  if ($(this).hasClass('active')) {

    $(this).removeClass('active');
    $(this).html('Показать еще');
    $('.p-review__review-hidden-list').animate({
      height: 'hide'
    }, 500, function() {
      isReviewsAnimate = false;
    });

  } else {

    $(this).addClass('active');
    $(this).html('Скрыть');
    $('.p-review__review-hidden-list').animate({
      height: 'show'
    }, 500, function() {
      isReviewsAnimate = false;
    });
  }

});

// product -- img slider

$('.p-small-img-box__img').click(function() {

  var src = $(this).find('img').attr('src');
  $('.p-foto-block__big-img img').animate({
    opacity: 'hide'
  }, 350, function() {
    $(this).attr('src', src);
    $('.p-foto-block__big-img img').animate({
      opacity: 'show'
    }, 350);

  });
});



$('.l-menu-box').click(function() {
  $('.bg_menu').animate({
    opacity: 'show'
  }, 300);
  $('#header_white').addClass('header_white');
  setTimeout(function() {
    $('.header-menu-open').addClass('header-menu-open_active');
  }, 400);
 $('body').addClass('body_hidden');

});

$('.header-menu-open_close').click(function() {
  var viewportWidth = window.innerWidth;

  if (viewportWidth < 1279) {
    setTimeout(function() {
      $('.header-menu-open_active').removeClass('header-menu-open_active');
      setTimeout(function() {
        $('.back_button').click();
        $('.bg_menu').animate({
          opacity: 'hide'
        }, 300);
        $('#header_white').removeClass('header_white');
      }, 400);
    }, 400);
  } else {

    $('.header-menu-open_active').removeClass('header-menu-open_active');
    setTimeout(function() {
      $('.back_button').click();
      $('.bg_menu').animate({
        opacity: 'hide'
      }, 300);
      $('#header_white').removeClass('header_white');
    }, 400);
  }



  $('body').removeClass('body_hidden');

});

$(document).mouseup(function(e) {
  var header = $("header");
  var block = $(".header-menu-open_active" );
  var search = $(".search_block")
  if ((((!header.is(e.target)) && (header.has(e.target).length === 0)) && ((!block.is(e.target)) && (block.has(e.target).length === 0)) && ((!search.is(e.target)) && (search.has(e.target).length === 0)) )) {
    $('.header-menu-open_close').click();
    $('.close_search').click();
  };
});



$('.menu_list-item').click(function() {
  $(this).siblings('.i-menu-block').addClass('i-menu-block_active');
});

$('.back_button').click(function() {
  $('.i-menu-block').removeClass('i-menu-block_active');
});

$(document).mouseup(function(e) {
  var block = $(".i-menu-block_active", );
  if ((((!block.is(e.target)) && (block.has(e.target).length === 0)))) {
    $('.back_button').click();
  };
});


$('#search_open').click(function() {

  if ( $('.header-menu-open').hasClass('header-menu-open_active')) {
  $('.header-menu-open').removeClass('header-menu-open_active');
  $('.bg_menu').animate({
   opacity: 'show'
 }, 300);
  setTimeout(function() {
   $('.search_block').addClass('search_block_active');
 }, 300);
 $('body').addClass('body_hidden');
} else {
 $('.bg_menu').animate({
  opacity: 'show'
}, 300);
 setTimeout(function() {
  $('.search_block').addClass('search_block_active');
}, 300);
$('body').addClass('body_hidden');

}


});


$('.close_search').click(function() {

  if ($('.search_block_result').hasClass('search_block_result_active') || $('.i-menu-block').hasClass('i-menu-block_active')) {

    $('.search_block_result').removeClass('search_block_result_active');
    setTimeout(function() {
      $('.search_block').removeClass('search_block_active');
      $('.header-menu-open_close').click();
      setTimeout(function() {
        $('.bg_menu').animate({
          opacity: 'hide'
        }, 300);
      }, 400);
    }, 400);
  } else
  {

    $('.search_block').removeClass('search_block_active');
    $('.header-menu-open_close').click();
    setTimeout(function() {
      $('.bg_menu').animate({
        opacity: 'hide'
      }, 300);
    }, 400);
  }


  $('body').removeClass('body_hidden');

});


var input = $('.search_block_input input')

input.keyup(function() {
  $('.search_block_result').addClass('search_block_result_active');
})


// Print only numbers

$('.num').bind("change keyup input click", function() {
  if (this.value.match(/[^0-9]/g)) {
    this.value = this.value.replace(/[^0-9]/g, '');
  }
});

// Slider for price

if ($('.price-slides').length) {

  var minVal = Number($('.price-slides').attr('data-min'));
  var maxVal = Number($('.price-slides').attr('data-max'));

  $(".price-slides").slider({
    min: minVal,
    max: maxVal,
    values: [minVal, maxVal],
    range: true,
    stop: function(event, ui) {
      $("input#priceMin").val($(".price-slides").slider("values", 0));
      $("input#priceMax").val($(".price-slides").slider("values", 1));
    },
    slide: function(event, ui) {
      $("input#priceMin").val($(".price-slides").slider("values", 0));
      $("input#priceMax").val($(".price-slides").slider("values", 1));
    }
  });

  $("input#priceMin").on('change', function() {
    var value1 = $("input#priceMin").val();
    var value2 = $("input#priceMax").val();
    if (parseInt(value1) > parseInt(value2)) {
      value1 = value2;
      $("input#priceMin").val(value1);
    }
    $(".price-slides").slider("values", 0, value1);
  });

  $("input#priceMax").on('change', function() {
    var value1 = $("input#priceMin").val();
    var value2 = $("input#priceMax").val();
    if (value2 > maxVal) {
      value2 = maxVal;
      $("input#priceMax").val(maxVal)
    }
    if (parseInt(value1) > parseInt(value2)) {
      value2 = value1;
      $("input#priceMax").val(value2);
    }
    $(".price-slides").slider("values", 1, value2);
  });

}

$('.clear-brands').click(function () {
  $('.c-filter__brand-box input[type="checkbox"]').each(function () {
    if ($(this).is(':checked')) {
      $(this).click();
    }
  });
});

$('.clear-price').click(function () {
  var min = $('.price-slides').attr('data-min');
  var max = $('.price-slides').attr('data-max');

  $('#priceMin').val(min);
  $('#priceMax').val(max);

  $("input#priceMin").change();
  $("input#priceMax").change();
});

// order tab

$('.o-tabs .o-tab').click(function() {

  var orderIndex = $(this).index();
  $('.o-tab.active').removeClass('active');
	$('.o-tab').eq(orderIndex).addClass('active');

	$('.o-item.active').removeClass('active');
	$('.o-item').eq(orderIndex).addClass('active');

});


// order tab map

$('.o-item-shop-choice__btns .o-item__tab-map').click(function() {

  var indexMap = $(this).index();
  $('.o-item__tab-map.active').removeClass('active');
	$('.o-item__tab-map').eq(indexMap).addClass('active');

	$('.o-item__map.active').removeClass('active');
	$('.o-item__map').eq(indexMap).addClass('active');

});


// number oreder

$(document).ready(function(){

  var a = $('.counter input').val();
  if (a == '') {
    $('.counter input').val('1');
  }

  $('.counter input').blur();
  counter_block();

});


$('.minus').click(function() {
  var value_number = Number($(this).siblings('input').val(), 10);
  $(this).siblings('input').val( function(){
    if (value_number > 1) {
      return value_number - 1
    } else {
      return value_number;
    }
  });
  $('.counter input').blur();
});


$('.plus').click(function() {
  var value_number = Number($(this).siblings('input').val(), 10);
  $(this).siblings('input').val( function(){
    return value_number + 1
  });
  $('.counter input').blur()
});


$('.counter input').blur(function() {
  var a = $(this).val();

  for (var i=0; i<10; i++) {
    var a = $(this).val();
    var b = a[0]
    if (b == 0) {
      var withOutZero = a.slice(1);
      $(this).val(withOutZero);
    } else {
      break;
    }
  };
  if (a == '') {
    $(this).val('1');
  }
});
