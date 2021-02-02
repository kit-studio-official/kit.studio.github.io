$(window).on('load' , function(){
	if ($('#typingString').length) {

		setTimeout(function() {
			$('.red_circle').addClass('red_circle_active');
			$('.red_circle_out').fadeOut(700)
		},300)

		$('#typingString').typeIt({
			speed: 50,
			loop: true,
			autoStart: false
		})
		.tiPause(1100)
		.tiSettings({speed: 100})
		.tiDelete()
		.tiPause(750)
		.tiType('Fans')
		.tiPause(3000)
		.tiDelete()
		.tiType('Memories')
		.tiPause(10000)
		.tiDelete()
		.tiType('Fans')
		.tiPause(10000)
		.tiDelete()
	}

	setTimeout(function() {
		$('#typingString').addClass('red_text')
	} ,2500)
});

$( document ).ready(function() {

	// formating progress bar on left
	function scrollParameters(index, nextIndex) {
		//progress bar
		var pageCount = Number($('.section').length);
		var offsetSection = Number($('.section').eq(nextIndex - 1).offset().top);
		var textHeight;
		if (nextIndex - 1 < index) {
			textHeight_up = Number($('.section').eq(nextIndex - 1).find('.text_container').offset().top + Math.abs(offsetSection));
			textHeight = textHeight_up;
			if (nextIndex == 1) {
				textHeight_up = Number($('.section').eq(nextIndex - 1).find('.text_container').offset().top + Math.abs(offsetSection));
			}
		} else {
			textHeight = Number($('.section').eq(nextIndex - 1).find('.text_container').offset().top);
		};
		var progresHeight = Number( $(window).height() - textHeight);
		var footerOffset = Number($(window).height() - $('footer').offset().top - $('footer').height());
		var	lineLimitation = progresHeight - footerOffset;
		var heightForProgresBar = lineLimitation / (pageCount - 1);
		var topHeight = nextIndex - 2;
		$('.line_scrollbar').animate({'height': progresHeight});
		if (nextIndex > 1) {
			if (nextIndex == 2) {
				$('.line_current_slide').animate({'margin-top': '0px'}, 300);
				$('.line_scrollbar').addClass('line_scrollbar_active');
			} else {
				$('.line_current_slide').animate({'margin-top': heightForProgresBar * topHeight + 'px'}, 300);
				$('.line_scrollbar').addClass('line_scrollbar_active');
			};
		} else {
			$('.line_scrollbar').removeClass('line_scrollbar_active');
		}
		$('.line_current_slide').css({'height': heightForProgresBar + 'px'});
		$('.line_grey').css({'height': lineLimitation + 'px' })
		/*var activeSlide = $('.section').eq(nextIndex - 1).attr()
		var*/
	};
	// formating Price in the slider block
	function formatPriceNumber(num) {
		var formatter = new Intl.NumberFormat('ru', {
			maximumFractionDigits: 3
		});
		var formattedNumber = formatter.format(num);
		var re = new RegExp(String.fromCharCode(160), "g");
		var replaced = formattedNumber.replace(re, ",");
		return	replaced;
	};
	// calculate price in the slider block
	function calculatingPrice() {
		var buttonPrice = Number($('.active_choose_button').attr('data-priceButton'));
		var sliderPrice = Number($('.red_circle_slider_active').attr('data-priceSlider'));
		var ActiveIndex = $('.red_circle_slider_active');
		var	indexOfActiveSlide = $('.red_circle_slider').index(ActiveIndex);
		var totalPrice = buttonPrice - sliderPrice;
		$('.price_total').text(formatPriceNumber(totalPrice));
		if (($('.button_choose').index($('.active_choose_button')) == 0)) {
			if (indexOfActiveSlide > 1) {
				sliderPrice = (((1 + indexOfActiveSlide) * 500));
				totalPrice = buttonPrice - sliderPrice;
				$('.price_total').text(formatPriceNumber(totalPrice));
			}
		}
	};
	// function to search right question
	function Search() {
		var textFromInput = $('#search').val().toLowerCase().trim();
		$('.hidden_list').html('');
		$('.question_block li').each(function() {
			var questionText = $(this).text().toLowerCase().trim();
			if (questionText.indexOf(textFromInput) > -1) {
				var	questionLinkText = $(this).find('a').text();
				var	questionLink = $(this).find('a').attr('href');
				$('.hidden_list').prepend('<li><a href=\"'+ questionLink + '\">' + questionLinkText + '</a> </li>')
			} 
		});
		if ($('.hidden_list li').length == 0) {
			$('.hidden_list').prepend('<li class="pointer_events_none"><a href="#"> nothing found </a></li>');
		}
	};
	// create a navigation on the FAQ section
	function Pagination(elementOnPage) {
		var NumberOfQuestion = $('.active_question').length;
		var onePageQuestion = elementOnPage;
		var pageCount = Math.ceil(NumberOfQuestion / onePageQuestion);
		$('.pagination_block').empty()
		for (var i = 1; i <= pageCount; i++) {
			if (i < 2) {
				$('.pagination_block').append('<div class="pagination_numbers active_pagination">'+ i + '</div>')
			} else {
				$('.pagination_block').append('<div class="pagination_numbers">'+ i + '</div>')
			}
		};
		if ($('.pagination_numbers').length > 5) {
			var  PaginationCount = $('.pagination_numbers').length;
			for (var i = 5; i <= PaginationCount; i++) {
				$('.pagination_numbers').eq(i).addClass('hide_pagination');
			}

			$('.pagination_block').append('<div class="more_pagination">more</div>')
		} 
		changePagination(elementOnPage)
	}
	// make navigation work
	function changePagination(elementOnPage) {
		var onePageQuestion = elementOnPage;
		var elements = $('.active_question');
		var NumberOfQuestion = $('.active_question').length;
		var pageCount = Math.ceil(NumberOfQuestion / onePageQuestion);
		var PageNumber = $('.active_pagination').text();
		var startPageElements = (PageNumber - 1) * onePageQuestion;
		var activePageElements = onePageQuestion * PageNumber;
		$('.question_block li').css({display: 'none'});
		for (var i = startPageElements; i < activePageElements; i++) {
			elements.eq(i).css({display: 'flex'});
		};
	}
	//function to choose section of question
	function activeSection() {
		var SectionActive = $('.ToggleButton_active').attr('data-sectionName');
		$('.question_block li').removeClass('active_question');
		$('.question_block li').each(function() {
			var questionSection = $(this).attr('data-sectionName');
			if (questionSection == SectionActive ) {
				$(this).addClass('active_question')
			};
			if (window.innerWidth > 1270) {
				Pagination(8);
				changePagination(8);
			} else {
				Pagination(6);
				changePagination(6);
			}
		});
	};
	//progressbar on mobile
	function mobileProgressbar() {
		if ($('.main_page').length) {
			var textHeight = $('.main_page').find('.text_container').offset().top;
			var blockHeight = $('.main_page').innerHeight();
			$('.main_page').find('.line_scrollbar').css({'height': (blockHeight - textHeight)});
		}
	}
	//active menu point
	function MenuPointActive() {
		$('.active_point_menu').removeClass('active_point_menu');
		var slideDataText = $('.section.active').attr('data-menuPointActive').toLowerCase();
		var MenuLength = $('.menu_header li').length;
		$('.menu_header li').each(function() {
			var menuDataText = $(this).attr('data-menuachor').toLowerCase();
			if (slideDataText == menuDataText) {
				console.log(slideDataText);
				$(this).addClass('active_point_menu');
			}
		})
	}
	function hiddenListBlock() {
		var offsetTop = $('#search').offset().top;
		var offsetLeft = $('#search').offset().left;
		var elementWidth = $('#search').outerWidth();
		var hiddenList = $('.hidden_list_block').css({'top':offsetTop, 'left': offsetLeft, 'width': elementWidth});
		$('.hidden_list_block').addClass('hidden_list_active');
	}

	if (window.innerWidth > 1270) {
		if ('#pagepiling') {
			$('#pagepiling').pagepiling({
				anchors: ['main', 'problem', 'solution', 'page4', 'page5', 'page6', 'page7', 'page8', 'pricing'],
				menu: '.menu',
				navigation: false,
				onLeave: function(index, nextIndex, direction)
				{
			//change header and footer to black color
			if ($('.section').eq(nextIndex - 1).hasClass('white_section')) {
				$('header').addClass('black');
				$('footer').addClass('black');
				$('.line_scrollbar').addClass('black_progress');
			} else {
				$('header').removeClass('black');
				$('footer').removeClass('black');
				$('.line_scrollbar').removeClass('black_progress');
			}
			//show right navigation on the solution section
			if ($('.section').eq(nextIndex - 1).hasClass('section_menu_right')) {
				$('.menu_right').addClass('active_menu_right');
			} else {
				$('.menu_right').removeClass('active_menu_right');
			}
			var currentSlide = $('.section').eq(nextIndex - 1).attr('id');
			var currentPoint = 'li[data-menuachor="' + currentSlide + '"]';
			$('.active_point').removeClass('active_point');
			$(currentPoint).addClass('active_point');
			//show links in footer 
			if ($('.section').eq(nextIndex - 1).hasClass('footer_link')) {
				$('.hidden_links').addClass('active_link');
			} else {
				$('.active_link').removeClass('active_link');
			};
			scrollParameters(index, nextIndex);
			// change button scrollDown/scrollUp
			if (nextIndex > 8) {
				$('.scroll').addClass('scroll_active');
			} else {
				$('.scroll').removeClass('scroll_active');
			}
			if (nextIndex > 1) {
				MenuPointActive();
			} else {
				$('.active_point_menu').removeClass('active_point_menu');
			}
		},
		afterRender: function(){
			scrollParameters(0, 1);
		},
	});
		};
	}
	if (window.innerWidth<1270) {
		mobileProgressbar()
	}
	
	if ($('.slider').length) {
		//slider in black section
		$( function() {
			var	sliderWidth = $('.slider').width();
			$('.circle_block').animate({'width': sliderWidth})
			var numberOfCircle = $('.red_circle_slider').length;
			$('.bottomText').click(function() {
				$('.red_circle_slider_active').removeClass('red_circle_slider_active');
				$('.red_circle_slider_active_small').removeClass('red_circle_slider_active_small');
				$(this).parent('.red_circle_slider').addClass('red_circle_slider_active');
				var indexOfButton = Number($(this).parent('.red_circle_slider').index());
				if ((indexOfButton + 1) == numberOfCircle) {
					$('.slider').addClass('slider_after_active');
				} else {
					$('.slider').removeClass('slider_after_active');
				}
				$('.red_circle_slider').eq(indexOfButton).prevAll('.red_circle_slider').addClass('red_circle_slider_active_small');
			});
			var select = Number($('.red_circle_slider_active').index() + 1);
			var slider = $( "#slider" ).slider({
				range: "min",
				value: select,
				min: 1,
				step: 1,
				max: numberOfCircle,
				slide: function( event, ui ) {
					var numberOfCircle = $('.red_circle_slider').length;
					var activeCircleIndex = ui.value - 1
					$('.red_circle_slider').eq(activeCircleIndex).nextAll('.red_circle_slider').removeClass('red_circle_slider_active_small');
					$('.red_circle_slider').eq(activeCircleIndex).prevAll('.red_circle_slider').addClass('red_circle_slider_active_small');
					$('.red_circle_slider_active').removeClass('red_circle_slider_active');
					$('.red_circle_slider').eq(activeCircleIndex).addClass('red_circle_slider_active');
					if ((activeCircleIndex + 1) == numberOfCircle) {
						$('.slider').addClass('slider_after_active');
					} else {
						$('.slider').removeClass('slider_after_active');
					}
					calculatingPrice();
				}
			});
			$( ".bottomText" ).on( "click", function() {
				var selectCurrent = $(this).parent('.red_circle_slider').index()
				slider.slider( "value", selectCurrent + 1 );
				calculatingPrice();
			});
		} );
	};
	

	// buttons scroll up/down
	$('.scroll_down').click(function() {
		$.fn.pagepiling.moveSectionDown();
	});
	$('.scroll_up').click(function() {
		$.fn.pagepiling.moveTo('main');
	});
	// open menu in mobile
	$('.menu_open').click(function(){
		$('.menu_open').toggleClass('close_menu');
		$('.menu_container_mobile').toggleClass('menu_container_mobile_active');
	})

	$('header a').click(function() {
		$('.menu_open').removeClass('close_menu');
		$('.menu_container_mobile').removeClass('menu_container_mobile_active');
	})
	// change question section 
	$('.ToggleButton').click(function(){
		$('.ToggleButton_active').removeClass('ToggleButton_active');
		$(this).addClass('ToggleButton_active');
		var headerText = $(this).text();
		$('#sectionNameHeader').text(headerText);
		activeSection();
	})

   	// show searching question
   	$('#search').keyup(function() {
   		Search();
   		hiddenListBlock();
   	});
   	// hide searching question
   	$('#search').blur(function() {
   		$(document).on("click",  function (event) {
   			var $element = $(event.currentTarget);
   			if (!$element.is("hidden_list_active")) {
   				$('.hidden_list_active').removeClass('hidden_list_active');
   			}
   		});
   	});

	// choose buttons in slider price block
	$('.button_choose').click(function chooseButton() {
		$('.active_choose_button').removeClass('active_choose_button');
		$(this).addClass('active_choose_button');
		calculatingPrice();
	});

	//play or stop video
	$('.video_block').click(function() {
		var video = $(this).find('video').get(0);
		if ( video.paused ) {
			video.play();
			$('.video_block').addClass('video_block_active');
		} else {
			video.pause();
			$('.video_block').removeClass('video_block_active');
		}
	});

	if (window.innerWidth > 1270) {
		Pagination(8);
	} else {
		Pagination(6);
		$('header').addClass('black')
		$('footer').addClass('black')
		$('.hidden_links').addClass('active_link');
	}

	// question navigation
	$(document).on('click', '.pagination_numbers', function() {
		$('.active_pagination').removeClass('active_pagination');
		$(this).addClass('active_pagination');
		if (window.innerWidth > 1270) {
			changePagination(8);
		} else {
			changePagination(6);
		}
	})
	// show more panigation buttons
	$(document).on('click', '.more_pagination', function() {
		$('.hide_pagination').removeClass('hide_pagination');
		$(this).remove();
	})


});

