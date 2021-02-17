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


// sort value

$(window).on('load', function () {
  $('.sort-dropdown').each(function () {
    var dropdownValue = $(this).find('.sort-dropdown__value p').text().trim();
    $(this).find('input').val(dropdownValue);

  })
});

$('.sort-dropdown__list li').on('click', function () {
  var getSortListText = $(this).text().trim();

  $(this).closest('.sort-dropdown').find('.sort-dropdown__value p').html(getSortListText);
  $(this).closest('.sort-dropdown__list').find('li').removeClass('active');
  $(this).addClass('active');

  $(this).closest('.sort-dropdown').find('input').val(getSortListText);

  if ($(window).width() < 750) {
    $(this).closest('.sort-dropdown').removeClass('active');
  }
});

if ($(window).width() < 750) {
  $('.sort-dropdown__value').on('click', function () {
    $('.sort-dropdown').removeClass('active');
    $(this).closest('.sort-dropdown').toggleClass('active');
  })
}


// product changes

$('.price-main-box__price').each(function () {
  var prodPrice = Number($(this).attr('data-price'));
  $(this).html(prodPrice);
});

if ($('.basket__sum-block').length) {
  var sum = 0;

  $('.price-main-box__price').each(function () {
    var price = Number($(this).text().trim());
    sum += price;
  })

  $('.basket__sum').html(sum);
}

function count(ths, newNumber) {
  var getNumberDescriptionBox = $(ths).closest('.price-main-box__counter-box').find('.price-counter__description');
  var getNumberOfDescription = Number(getNumberDescriptionBox.attr('data-number'));
  var getBoxForDescriptionNumber = getNumberDescriptionBox.find('strong');

  if (getNumberDescriptionBox.length) {
    var newNumberForDescription = newNumber * getNumberOfDescription;
    getBoxForDescriptionNumber.html(newNumberForDescription);
  }

  var getPriceBox = $(ths).closest('.price-main-box__right-block').find('.price-main-box__price');
  var getPrice = Number(getPriceBox.attr('data-price'));

  if (getPriceBox.length) {
    var newPrice = getPrice * newNumber;
    getPriceBox.html(newPrice);
  }

  var getSumBlock = $(ths).closest('.container').find('.basket__sum-block');
  var getSumBox = getSumBlock.find('.basket__sum');

  if (getSumBlock.length) {
    var sum = 0;

    $('.price-main-box__price').each(function () {
      var price = Number($(this).text().trim());
      sum += price;
    })

    getSumBox.html(sum);
  }
}


// plus

$('.price__plus').on('click', function () {
  var input = $(this).closest('.price-counter').find('input');
  var inputVal = Number(input.val());

  if (inputVal == 99) {
    return;
  }

  input.val(++inputVal);

  var newInputVal = Number(input.val());
  var newNumber = newInputVal;

  count(this, newNumber);
});


// minus

$('.price__minus').on('click', function () {
  var input = $(this).closest('.price-counter').find('input');
  var inputVal = Number(input.val());

  if (inputVal == 1) {
    return;
  }

  input.val(--inputVal);

  var newInputVal = Number(input.val());
  var newNumber = newInputVal;

  count(this, newNumber);
});

$('.number__input').on('blur', function () {
  var inputVal = Number($(this).val());

  if (inputVal <= 0) {
    $(this).val(1);
  }

  var newInputVal = Number($(this).val());
  var newNumber = newInputVal;

  count(this, newNumber);
});

$('.number__input').on('input', function () {
  var inputVal = Number($(this).val());
  var newNumber = inputVal;

  count(this, newNumber);
});


// btn take product

$('.price-main-box__btn').on('click', function () {
  var getNewText = $(this).attr('data-text');

  $(this).addClass('active');
  $(this).find('p').html(getNewText);
});


// remove product in basket

$('.basket__remove-product').on('click', function () {
  $(this).closest('.price-main-box').remove();

  var sum = 0;

  $('.price-main-box__price').each(function () {
    var price = Number($(this).text().trim());
    sum += price;
    console.log(sum)
  })

  $('.basket__sum').html(sum);
});


// tabs

$('.ordering__tab').on('click', function () {
  var tabIndex = $(this).index();
  var tabItem = $(this).closest('.ordering__tabs-block').find('.ordering__item');

  $('.ordering__tab').removeClass('active');
  $(this).addClass('active');

  tabItem.removeClass('active');
  tabItem.eq(tabIndex).addClass('active');
});


// take file

$('.ordering__form-file input[type="file"]').change(function() {
  var inputVal = this.value;

  if (inputVal != '') {
    var fileName = this.files[0].name;

    $(this).closest('.ordering__form-file').find('label p').html(fileName);
  } else {
    $(this).closest('.ordering__form-file').find('label p').html('Прикрепить реквизиты предприятия *');
  }
});


// drag and drop

$(function() {

  // preventing page from redirecting
  $('html').on("dragover", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).find('.ordering__form-file label').removeClass('hover');
    $('.ordering__form-file p').text("Перетащите файл сюда");
  });

  // Didn't drop to box
  $('html').on("drop", function(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).find('.ordering__form-file p').text('Прикрепить реквизиты предприятия *');
  });

  // Drag enter
  $('.ordering__form-file label').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).addClass('hover');
    $('.ordering__form-file p').text("Отпустите");
  });

  // Drag over
  $('.ordering__form-file label').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.ordering__form-file p').text("Отпустите");
  });

  // Drop
  $('.ordering__form-file label').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('hover');
    $('.ordering__form-file p').text(fileName);

    var file = e.originalEvent.dataTransfer.files;
    var fd = new FormData();

    var fileName = file[0].name;
    $(this).find('p').text(fileName);

    fd.append('file', file[0]);

    uploadData(fd);
  });
});

// Sending AJAX request and upload file
function uploadData(formdata){
  $.ajax({
    url: 'upload.php',
    type: 'post',
    data: formdata,
    contentType: false,
    processData: false,
    dataType: 'json'
  });
}


// modal

$('.ordering-price__btn').on('click', function (e) {
  e.preventDefault();

  blockBody();
  $('.modal-container').addClass('active');
})

$('.modal-container').on('click', function (eve) {
  if (!($(eve.target).closest('.modal-content').length)) {
    blockBody();
    $('.modal-container').removeClass('active');
  }
})

$('.modal-close-btn').on('click', function () {
  blockBody();
  $(this).closest('.modal-container').removeClass('active');
})


// modall input

$('.modal__input-box input').on('input', function (e) {
  if (this.value.length == 0 && $(this).prev().length) {
    $(this).prev().focus();
  }

  if (this.value.length == 1 && $(this).next().length) {
    $(this).next().focus();
  }
})