function equalHeight(group, groupSize) {
	if (!group.length) {
		return;
	}
	groupSize = +(groupSize || 0);
	if (groupSize < 1) {
		groupSize = group.length;
	}
	var start = -groupSize, part;
	while ((part = group.slice(start += groupSize, start + groupSize)) && part.length) {
		part.outerHeight(Math.max.apply(null, $.makeArray(part.map(function () {
			return $(this).outerHeight();
		}))));
	}
}

jQuery(function ($) {

	// equalHeight - костыль, убираем уго


	var resizeTimeout;
	var scrollSlider, productSlider, gallerySlider, scrollSliderSimple, sliderDots, sliderColor;

	function resizeWindow() {
		$('.color-table .wrap-color').css('height', $('.color-table .wrap-color').width());
		$('.intro a').css('height', 'auto');
		equalHeight($('.intro a'));
		$('.eq-height').css('height', 'auto');
		equalHeight($('.double-col .eq-height'), 2);
		$('.columns .col-i').css('height', 'auto');
		equalHeight($('.columns .col-i'), 2);
	};
	$(window).on('load resize', function () {
		resizeWindow();
	});

	window.addEventListener("orientationchange", function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			resizeWindow();
		}, 100);
	}, false);
	$(document)

			.on('click', '.wrap-form .btn-close', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-form').removeClass('sent').find('.form').hide();

				setTimeout(function () {
					el.closest('.wrap-form').find('.js_btn-form').show();
				}, 500)
			})

			.on('click', '.wrap-form .btn-send', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-form').addClass('sent');

				setTimeout(function () {
					el.closest('.wrap-form').find('.form').hide();
					el.closest('.wrap-form').removeClass('sent');
					setTimeout(function () {
						el.closest('.wrap-form').find('.js_btn-form').show();
					}, 500)
				}, 3000);

			})
			.on('click', '.footer .js_btn-form', function (e) {
				e.preventDefault();
				var el = $(this);
				el.hide();
				el.closest('.wrap-form').find('.form').slideDown();
			})

			.on('click', '.btn-burger ,.wrap-menu .btn-close', function (e) {
				e.preventDefault();
				if (snapper.state().state == "left") {
					snapper.close();
				} else {
					snapper.open('left');
				}
			})

			.on('click', '.feedback-list .wrap-btn .btn-more', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-btn').addClass('active');
				el.closest('.wrap-item').find('.hidden').slideDown();
			})

		//tabs
			.on('click', '.btn-drop', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-item').find('.drop-list').slideToggle();
				el.toggleClass('active');
				if (el.closest('.wrap-item').find('.swiper-container').length) {
					gallerySlider.update();
				}
			})
			.on('click', ' .double-tab .item', function (e) {
				e.preventDefault();
				var el = $(this);
				if (!el.hasClass('active')) {
					el.closest('.double-tab').find('.item').removeClass('active');
					el.addClass('active');
//					добавил wrapper-tabs как глобальный класс через него можно будет везде настроить раксрытиве табов
					var p = el.closest('.tab-item,.wrapper-tabs');
					p.find('.wrap-list .list').removeClass('active').hide();
					var list = p.find('.wrap-list .list').eq(el.index());
					list.fadeIn(function () {
						list.find('.swiper-product,.swiper-photo').data('swiper').update();
					});
					//p.find('.btn-form').removeClass('active');
					p.find('.color-table .color').removeClass('active');
					$('.eq-height').css('height', 'auto');
					equalHeight($('.double-col .eq-height'), 2);
					$('.columns .col-i').css('height', 'auto');
					equalHeight($('.columns .col-i'), 2);
				} else {
					return
				}

			})
			.on('click', '.color-table .wrap-color .color', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.color-table').find('.color').removeClass('active');
				el.addClass('active');
			})
			.on('click', '.tab-list .tab-title', function (e) {
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-item').find('.tab-item').stop(true, true).slideToggle();
				$('.color-table .wrap-color').css('height', $('.color-table .wrap-color').width());
				$('.eq-height').css('height', 'auto');
				equalHeight($('.double-col .eq-height'), 2);
				$('.columns .col-i').css('height', 'auto');
				equalHeight($('.columns .col-i'), 2);
			})
			.on('click', '.choose-material .choose-item', function (e) {
				e.preventDefault();
				var el = $(this);
				$('.choose-material .choose-item').removeClass('active');
				el.addClass('active');
				var i = el.index();
				var p = el.closest('.tab-item').find('.compare-material');
				p.find('.list').each(function () {
					var $this = $(this);
					$this.find('.compare-item').removeClass('active').hide();
					$this.find('.compare-item').eq(i).fadeIn();
				});
			})


			.on('click', '.js_label-close', function () {
				$(this).parent('.label').slideUp();
			})

			//гармошка (аккордеон)
			.on('click', '.js_expander-trigger', function () {
				$(this).toggleClass('active').next('.js_expander-content').slideToggle();

			})

			//js_basket-item_remove
			.on('click', '.js_basket-item_remove', function () {
				$(this).parent('.item_basket').hide("slow");
			})

			//TODO да бля
			.on('click', '.js_expander-close', function (e) {
				e.preventDefault();
				$(this).parent('.js_expander-content').slideUp("slow");
			})

			//гармошка_ СО СМЕНОЙ ТЕКСТА
			.on('click', '.js_more-trigger', function (e) {
				e.preventDefault();
				var $el = $(this);
				$el.text(function(i, text) {
					 return text == $el.data('def-text') ?  $el.data('tgl-text') : $el.data('def-text');
				});
				$(this).toggleClass('active').prev('.js_more-content').slideToggle();
			})

			//TODO да бля
			.on('click', '.js_gallery-more', function (e) {
				e.preventDefault();
				$(this).text(function (i, text) {
					return text === "Подробнее" ? "Скрыть информацию" : "Подробнее";
				});
				$(this).parents('.item_gallery').find('.item_gallery-toggle').slideToggle();//
			})

			.on('click', '.choose-city', function (e) {
				e.preventDefault();
				$(this).closest('.wrap-cities').find('.drop-down.cities-list').slideToggle();
			})
			.on('click', '.lang-list .item', function (e) {
				e.preventDefault();
				var el = $(this);
				if (!el.hasClass('active')) {
					$('.lang-list .item').removeClass('active');
					el.addClass('active');
				}
			})
			//снять фильтры
			.on('click', '.btn-filter-delete', function (e) {
				e.preventDefault();
				var el = $(this);
				var src = el.attr('href');
				el.closest('.wrap-filters').find('.filter .color, .filter .material').removeClass('active');

				$("input").prop("checked", false);

				//TODO
				// var $select = $('.wrap-select select').select2();
				// $select.val(null).trigger('change.select2');

				$('.select2-selection__choice').remove();
				$('.select2-results__option').attr("aria-selected", false);//.prop("aria-selected", false);

				//.empty();
				//$select.val(null).trigger('change');

				//$("html, body").animate({ scrollTop: $(src).offset().top - 80 }, 1500);
			})


			.on('click', '.wrap-filters .material-table .material,.wrap-filters .color-table .color', function (e) {
				e.preventDefault();
				var el = $(this);
				el.toggleClass('active');
			})
			.on('click', '.filter .btn-filter-drop', function (e) {
				e.preventDefault();
				var el = $(this);
				el.toggleClass('active');
				el.closest('.filter').find('.drop-down').slideToggle();
			})
			.on('click', '.btn-open-filters', function (e) {
				e.preventDefault();
				var el = $(this);
				el.toggleClass('active');
				el.closest('.wrap-filters').find('>.drop-down').slideToggle();
			})
			.on('touchstart','.swiper-instruction',function(){
				$(this).addClass('hide');
			})
			.on('click', '.btn-ajax', function (e) {
				e.preventDefault();
				var el = $(this);
				var src = el.attr('href');
				var content = el.closest('.wrap-ajax').find('.ajax-content');
				$.ajax({
					url: src, success: function (data) {
						content.append(data);
					}
				});
			})
			.on('click', '.HERE_tabs .js_tab-trigger', function(){

				var el = $(this),
						index = el.index(),
						parent = el.parent('.HERE_tabs'),
						tabs = parent.find('.js_tab-content'),
						current_tab = tabs.get(index);
						el.addClass('active').siblings().removeClass('active');

						$(current_tab).show().siblings('.js_tab-content').hide();
					  return false;
			});
			$(".js_tab-content:first").show();




	//Swiper
	var sliderOption = {
		scrollbar: '.swiper-scrollbar',
		scrollbarHide: false,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 15,
		onInit:function(swiper){
			swiper.slideTo(1);
		}
	};

	gallerySlider = new Swiper($('.swiper-photo_blue'), sliderOption);

	$('.swiper-photo, .swiper-product').each(function () {
		var slider = $(this);
		slider.data('swiper', new Swiper(slider, sliderOption));
	});

	sliderDots = new Swiper($('.swiper-dot').swiper({
		//Your options here:
		loop: true,
		pagination: '.swiper-dot-pagination',
		paginationClickable: true
		//createPagination: true
	}));

	sliderColor = new Swiper($('.swiper-color').swiper({
		scrollbar: '.swiper-scrollbar',
		scrollbarHide: false,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 15,


		createPagination: false,
		paginationElement: 'i',
		//Your options here:

		loop: true,
		pagination: '.swiper-color-pagination',
		paginationClickable: true
		//createPagination: true
	}));


	$('.wrap-select select').select2();

	// $(".tags select").select2({
	// 	//tags: true,
	// 	allowClear: true,
	// 	placeholder: "множественный выбор"
  // 	//tokenSeparators: [',', ' ']
	// });


	$('.custom-scroll-blue').each(function () {
		var el = $(this);
		el.mCustomScrollbar({
			axis: 'x'
		});
	});

	var snapper = new Snap({
		element: document.getElementById('content'),
		maxPosition: 290,
		minPosition: 0,
		transitionSpeed: 0.3,
		hyperextensible: false,
		disable: 'right'
	});
	//close menu when scroll content
	$('.content').on('scroll',function(){
		if($('.snapjs-left').length){
			snapper.close();
		}
	});
});
