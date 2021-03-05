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

$(window).scroll(function () {
  var scroll = $(this).scrollTop();

  if (scroll > 0) {
    $('.header').addClass('fill');
  } else {
    $('.header').removeClass('fill');
  }
});



// mob menu

$('.header__hamburger').on('click', function () {
  $(this).toggleClass('active');
});


// anchor

$('.link-scroll').on("click", function (event) {
  event.preventDefault();

  var id = $(this).attr('href');
  var top = $(id).offset().top + 5;

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
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 700,
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
  container: animationElement1, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_1.json' // the path to the animation json
});

lottie.loadAnimation({
  container: animationElement2, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_2.json' // the path to the animation json
});

lottie.loadAnimation({
  container: animationElement3, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'Block_3.json' // the path to the animation json
});









// var lineLenght = $('.line').get(0).getTotalLength();
// console.log (lineLenght);