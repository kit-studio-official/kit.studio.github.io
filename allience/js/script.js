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


$(".header__menu-icon").click(function() {
  blockBody();
  $(this).find('.hamburger').toggleClass("is-active");
  $('main').toggleClass('brightness');
  $('.header__mob-menu').toggleClass('active');

  if ($(window).innerWidth() < 760) {
    if ($('.header__mob-menu').hasClass('active')) {
      $('.header').addClass('line');
    } else {
      $('.header').removeClass('line');
    }
  }
});

$('.header__mob-menu').on('click', function (e) {
  if (!$('.mob-menu').is(e.target) && $('.mob-menu').has(e.target).length === 0) {
    $(".header__menu-icon").click();
  }
});


if ($(window).innerWidth() > 1279) {
  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > 90) {
      $('.header').addClass('active');
    } else {
      if (!($('body').hasClass('overflow'))) {
        $('.header').removeClass('active')
      }
    }
  });
} else {
  $('.header').addClass('active');

  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > 1) {
      $('.header').addClass('line')
    } else {
      if (!($('.header__mob-menu').hasClass('active'))) {
        $('.header').removeClass('line')
      }
    }
  });
}

function calculatingValue() {
  var $block = $('.country_box_row');
  $block.each(function() {
   var techValue =  $(this).find('.col.tech_rating p').text();
   var specValue = $(this).find('.col.spec_rating p').text();
   var countryRating = $(this).find('.col.country_rating p').text();
   var researchRating = $(this).find('.col.research_rating p').text();
   var educationRating = $(this).find('.col.education_rating p').text();

   $(this).find('.hidden_block').find('.tech_rating').text(techValue);
   $(this).find('.hidden_block').find('.spec_rating').text(specValue);
   $(this).find('.hidden_block').find('.country_rating').text(countryRating);
   $(this).find('.hidden_block').find('.research_rating').text(researchRating);
   $(this).find('.hidden_block').find('.education_rating').text(educationRating);
 });
}

$(document).ready(function() {
  calculatingValue();
  changeChooseCountry();
  zoomMap('down');
  scrollSlide();
  defaultMap();
  $(document).scroll();
});


$(document).on('click', '.country_flag_name' , function() {
  if ($(window).innerWidth() < 1200) {
    var block_offset = $('.country_list').offset().top;
    var row_offset = $(this).closest('.country_box_row').offset().top;
    var hiddenBlockHeight = $(this).closest('.country_box_row').find('.hidden_block').height();
    $('.hidden_block.active').fadeOut(300, function() {
      $(this).removeClass('actve');
      $(this).removeClass('top');
    });
    if ((row_offset - block_offset) > hiddenBlockHeight) {
      $(this).closest('.country_box_row').find('.hidden_block').addClass('top');
      $(this).closest('.country_box_row').find('.hidden_block').fadeIn(300,function() {
        $(this).addClass('active');
      });
    } else {
      $(this).closest('.country_box_row').find('.hidden_block').fadeIn(300, function() {
        $(this).addClass('active');
      });
    }
  }
});

$('.country_list').scroll(function() {
  $('.hidden_block.active').fadeOut(300,function() {
    $(this).removeClass('actve');
    $(this).removeClass('top');
  });
});

// $('.country').click(function() {
//   $('.country.active').removeAttr('style');
//   $('.country.active').removeClass('active');
//   var blockColor = $(this).find('.country_point').find('.color').css('background-color');
//   $(this).addClass('active');
//   $('.map_tab_option').removeClass('active');
//   changeChooseCountry();
//   changeMapModal();
//   if ($(window).innerWidth() > 1280) {
//     $(this).css({'background': blockColor, 'border-color' : blockColor});
//     $('.modal_answer_map').find('.country_rating span').css({'color': blockColor});
//   }
// });


let modalcoord = {
  'china' :[231,552],
  'usa' :[235,141],
  'great_breatan' :[276,343],
  'canada' :[291,124],
  'germany' :[269,367],
  'korea_republic' :[231,604],
  'france' :[255,353],
  'japan' :[230,626],
  'india' :[200,508],
  'russia' :[300,536],
  'australia' :[105,617],
  'denmark' :[281,366],
  'israel' :[225,418],
  'spain' :[239,337],
  'italy' :[250,367],
  'netherland' :[270,357],
  'singapoor' :[161,551],
  'austria' :[258,376],
  'belgium' :[268,356],
  'brazil' :[135,246],
  'norway' :[306,372],
  'polish' :[270,385],
  'portugalian' :[239,330],
  'finland' :[302,399],
  'switzerland' :[302,379],
  'sweden' :[256,363],
  'argentin' :[93,214],
  'bangladesh' :[202,527],
  'vietnam' :[194,557],
  'greece' :[240,392],
  'egypt' :[210,404],
  'indonesia' :[154,573],
  'iran' :[220,458],
  'iraq' :[224,433],
  'ireland' :[272,329],
  'colombia' :[161,194],
  'malaysia' :[157,572],
  'mexico' :[200,138],
  'uae' :[202,454],
  'romania' :[252,396],
  'saudi' :[206,432],
  'thailand' :[189,548],
  'turkish' :[235,418],
  'philipines' :[175,594],
  'czech' :[264,376],
  'chili' :[103,205],
  'south_africa' :[94,396],
  'nigeria' :[171,363],
  'pakistan' :[218,490],
  'peru' :[132,191],
}


var currentStep = 50;
var modalPercent = [];
var modalHeightPercent = [];
$.each(modalcoord, function( key, value ) {
  modalPercent.push(value[1] / 100);
  modalHeightPercent.push(value[0] / 100);
});

function zoomMap(direction) {

  if ($(window).innerWidth() < 767) {
    var step = 5;
    var modalStep = step * 2
    var zoomDirection = direction;
    var mapProcent = 1468 / 100;
    if (zoomDirection == 'up') {
      if (currentStep == 100) {
        return;
      } else {
        currentStep += step;
        var i = 0;
        $.each(modalcoord, function(key, value, ) {
         value[1] += modalPercent[i] * modalStep;
         value[0] += (modalHeightPercent[i] / 1.1) * modalStep;
         i++;
       });
        $('.modal_answer_map').removeClass('active');
      }
    } else if (zoomDirection == 'down'){
      if (currentStep == 25) {
        return;
      } else {
        currentStep -= step;
        var i = 0;
        $.each(modalcoord, function( key, value ) {
          value[1] -= modalPercent[i] * modalStep;
          value[0] -= (modalHeightPercent[i] / 1.1) * modalStep;
          i++;
        });
        $('.modal_answer_map').removeClass('active');
      }
    }
    if (currentStep < 35) {
      $('.map').css({'top': '50%', 'transform': 'translateY(-50%) translateX(-30%)', 'left': '50%'});
    } else {
      $('.map').css({'top': '', 'transform': '', 'left': ''});
    }
    var mapWidthCurrent = currentStep * mapProcent;
    $('.map').width(mapWidthCurrent + 'px');
  }
}

$('.plus').click(function() {
  zoomMap('up');
});


$('.minus').click(function() {
  zoomMap('down');
});

$('.map_tab_option').click(function() {
  if ($(this).hasClass('active')) {
    return;
  }
  $('.map_tab_option.active').removeClass('active');
  $(this).addClass('active');
  var ratingText = $(this).attr('data-ratingText');
  changeChooseCountry();
  $('.modal_answer_map').removeClass('active');
  $('.tab_description').text(ratingText);
});


function changeChooseCountry() {
  $('.map_svg path.active').css('fill', 'white');
  $('.map_svg path.active').css({'stroke': '#D5DFFF'});
  $('.map_svg path').removeClass('active');
  var tabOption = $('.map_tab_option.active').attr('data-rating');
  var tabOptionColor = $('.map_tab_option.active').attr('data-color');
  $('.map_svg path').each(function() {
    var countryOption = $(this).attr('data-rating');
    if (countryOption == tabOption) {
      $(this).addClass('active');
      $(this).css({'fill': tabOptionColor});
      // $(this).css({'stroke': '#D5DFFF'});
      if (!($(this).attr('data-country') == 'canada')) {
        $(this).css({'stroke': '#D5DFFF'});
      }
    }
    if (tabOption == 'none') {
      $(this).addClass('active');
      $(this).css('stroke', '');
      defaultMap();
    }
  });
  $('.map_svg path.active').hover(function(){
    if ($(this).hasClass('active')) {
     var listAttr;
     if ($(this).hasClass('none')) {
      return;
    } else {
     listAttr = $(this).attr('data-country').toLowerCase();
   }
   var countryName;
   var countryRate;
   $('.country').each(function(){
    var countryNameList = $(this).attr('data-country');
    if (listAttr == countryNameList) {
      countryName = $(this).find('.country_name p').text();
      countryRate = $(this).find('.country_point p').text();
    }
  });
   $('.modal_answer_map').css({'bottom': modalcoord[listAttr][0], 'left': modalcoord[listAttr][1], 'display' : 'block'});
   $('.modal_answer_map').find('.country_name').text(countryName);
   $('.modal_answer_map').find('.country_rating span').text(countryRate);
   $('.modal_answer_map').addClass('active');
 }
},function(){});
}

function defaultMap() {
  $('.map_svg path').each(function() {
    var mapAttr = $(this).attr('data-rating');
    if (mapAttr == 4) {
      $(this).css({'fill': '#213DAC'});
    } else if (mapAttr == 3) {
      $(this).css({'fill': '#2F57F6'});
    } else if (mapAttr == 2) {
      $(this).css({'fill': '#6D89F9'});
    } else if (mapAttr == 1) {
      $(this).css({'fill': '#C1CDFC'});
    } else {
      $(this).css('fill', '');
    }
  });
}


$('.experts-slider').slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: false,
  dots: false,
  responsive: [
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
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


var arrforSorting = [];
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

function byNumeric(field) {
  return (a, b) => Number(a[field]) > Number(b[field]) ? -1 : 1;
}


function sortArray(field) {
  arrforSorting.sort(byField(field));
}

function sortArrayByNumeric(field) {
  arrforSorting.sort(byNumeric(field));
}

function changesortirating() {
  $('.country_list').fadeOut(500, function() {
    $(this).empty();
    var index = 0;
    arrforSorting.forEach(function() {
      $('.country_list').append(
        '<div class="country_box_row">' +
        '<div class="hidden_block">' +
        '<div class="rectangle"></div>'+
        '<ul> <li> <p>Программное и аппаратное обеспечение</p><p class="tech_rating"></p></li><li><p>Специалисты</p><p class="spec_rating"></p> </li><li><p>Государство</p><p class="country_rating"></p></li><li><p>Исследования</p><p class="research_rating"></p></li><li><p>Образование</p><p class="education_rating"></p></li></ul></div><div class="country_flag_name col"> <div class="flag"> <span>?</span>' +
        '<img src="' + arrforSorting[index].img_src +
        ' " alt=""></div><div class="country_name"><p class="name">' +
        arrforSorting[index].name +
        '</p> <p class="AI_level">' + 
        arrforSorting[index].AI_level +
        '</p> </div></div><div class="col rating_AI ' +
        arrforSorting[index].AI_level + '"> <p>' + 
        arrforSorting[index].rating_AI +
        '</p></div><div class="rating_group">' +
        '<div class="col tech_rating rating_text"><p>' + arrforSorting[index].tech_rating +'</p></div>' +
        '<div class="col spec_rating rating_text"><p>' + arrforSorting[index].spec_rating + '</p></div>' +
        '<div class="col country_rating rating_text"><p>' + arrforSorting[index].country_rating + '</p></div> </div>' +
        '<div class="col research_rating rating_text"><p>' + arrforSorting[index].research_rating + '</p></div>' +
        '<div class="col education_rating rating_text"><p>' + arrforSorting[index].education_rating  + '</p></div></div>'
        );
      index++
    });
    $('.country_list').animate({scrollTop: 0});
  });
  $('.country_list').fadeIn(500, function() {
    calculatingValue();
  });
}

$('.title_list_desktop').click(function() {
  var fieldName = $(this).attr('data-field');
  if (!$(this).hasClass('default')) {
    $(this).addClass('default');
    if ($(this).hasClass('country_title')) {
      sortArray(fieldName);
    } else {
     sortArrayByNumeric(fieldName);
   }
 } else {
  $('.title_list_desktop').removeClass('default');
  arrforSorting.reverse();
 }
 changesortirating();
})

$(function() {
  $('.country_box_row').each(function() {
    arrforSorting.push({
      name: $(this).find('.country_name').find('.name').text(),
      AI_level: $(this).find('.country_name').find('.AI_level').text(),
      rating_AI: $(this).find('.rating_AI p').text(),
      tech_rating: $(this).find('.hidden_block').find('.tech_rating').text(),
      spec_rating: $(this).find('.hidden_block').find('.spec_rating').text(),
      country_rating: $(this).find('.hidden_block').find('.country_rating ').text(),
      research_rating: $(this).find('.hidden_block').find('.research_rating').text(),
      education_rating: $(this).find('.hidden_block').find('.education_rating').text(),
      img_src: $(this).find('.country_flag_name').find('.flag img').attr('src'),
    });
  });
});

function scrollSlide() {

  if ($(window).innerWidth() > 1200) {
    var tabCount = $('.tab_content').find('.tab').length;
    var tab_height = $('.tab_container').height() * tabCount * 1.5;
    var block_height = $('.book-section').height() + 140;
    $(function() {
      $('.tab_block').height(tab_height + block_height);
    });

    var offsetTab, scrollTopSlider, tabPercent, scrollIn, tab_heightPercent;
    var activePercent;
    $(document).scroll(function() {
      offsetTab = $('.tab_block ').offset().top;
      scrollTopSlider = $(document).scrollTop();
      tabPercent = Math.round(100 / tabCount).toFixed(0);
      scrollIn = scrollTopSlider - offsetTab + block_height + 50;
      tab_heightPercent = (tab_height - block_height) / 100;
      var activeSlidePercent = $('.tab.active').index() * tabPercent;
      var posdef = tabPercent * tab_heightPercent;
      var pos_2 =  (tabPercent * 2) * tab_heightPercent;
      var pos_3 =  (tabPercent * 3) * tab_heightPercent;
      if (scrollIn >= posdef) {
        $('.tab.active').removeClass('active');
        $('.tab_2').addClass('active');
        $('.gradient').addClass('stop_2');
        if (scrollIn >= pos_2) {
         $('.tab.active').removeClass('active');
         $('.tab_3').addClass('active');
         $('.gradient').addClass('stop_3');
       } else {
        $('.tab.active').removeClass('active');
        $('.tab_2').addClass('active');
        $('.gradient').removeClass('stop_3');
      }
    } else {
      $('.tab.active').removeClass('active');
      $('.tab_1').addClass('active');
      $('.gradient').removeClass('stop_2');
    }
  });
  }
}

$(window).on('scroll', function () {
  var scrollBottom = $(this).scrollTop() + window.innerHeight;
  var scrollAnimationMinus = 70;

  $('.ani').each(function () {

    var elementPosition = $(this).offset().top + scrollAnimationMinus;

    if (scrollBottom >= elementPosition) {
      $(this).addClass('animation');
    }

  });

});


$('.header__nav_anchor').click(function() {
 event.preventDefault();
 var id  = $(this).attr('href'),
 top;
 if ($(window).innerWidth() < 1279) {
  $('.header__menu-icon').click();
}
console.log(id);
if ($(window).innerWidth() > 760) {
  top = $(id).offset().top - 100;
} else {
  top = $(id).offset().top - 80;
}
$('body,html').animate({scrollTop: top}, 1500);
});