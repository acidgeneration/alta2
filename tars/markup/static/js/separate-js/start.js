

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

/*

	// equalHeight - костыль, убираем уго


	var resizeTimeout;
	var scrollSlider,gallerySlider,scrollSliderSimple;
	function resizeWindow() {
		$('.color-table .wrap-color').css('height',$('.color-table .wrap-color').width());
		$('.intro .list-item').css('height', 'auto');
		equalHeight($('.intro .list-item'));
		$('.eq-height').css('height','auto');
		equalHeight($('.double-col .eq-height'),2);
		$('.columns .col-i').css('height','auto');
		equalHeight($('.columns .col-i'),2);
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

*/

	$(document)
//			.on('click','.lang-list .item',function(e){
//				var el = $(this);
//			})
			.on('click','.wrap-form .btn-close',function(e){
				e.preventDefault();
				var el = $(this);


				// el.closest('.wrap-form').find('.form').hide();
				// el.closest('.wrap-form').removeClass('sent');
				//

				el.closest('.wrap-form').removeClass('sent').find('.form').hide();




				setTimeout(function () {
					el.closest('.wrap-form').find('.js_btn-form').show();
				},500)
			})

			.on('click','.wrap-form .btn-send',function(e){
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-form').addClass('sent');
				setTimeout(function(){
					el.closest('.wrap-form').find('.form').hide();
					el.closest('.wrap-form').removeClass('sent');
					setTimeout(function () {
						el.closest('.wrap-form').find('.js_btn-form').show();
					},500)
				},3000);
			})
			.on('click','.footer .js_btn-form',function(e){
				e.preventDefault();
				var el = $(this);
				el.hide();
				el.closest('.wrap-form').find('.form').slideDown();
			})


			.on('click','.btn-burger',function(e){
				e.preventDefault();
				$('body').addClass('menu-open');
			})
			.on('click','.feedback-list .wrap-btn .btn-more',function(e){
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-btn').addClass('active');
				el.closest('.wrap-item').find('.hidden').slideDown();

			})

			//tabs
			.on('click','.btn-drop',function(e){
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-item').find('.drop-list').slideToggle();
				el.toggleClass('active');
				gallerySlider.update()
			})
			.on('click',' .double-tab .item',function(e){
				e.preventDefault();
				var el = $(this);
				el.closest('.double-tab').find('.item').removeClass('active');
				el.addClass('active');
				var p = el.closest('.tab-item');
				p.find('.wrap-list .list').removeClass('active').hide();
				p.find('.wrap-list .list').eq(el.index()).fadeIn();
				//p.find('.btn-form').removeClass('active');
				p.find('.color-table .color').removeClass('active');
				$('.eq-height').css('height','auto');
				equalHeight($('.double-col .eq-height'),2);
				$('.columns .col-i').css('height','auto');
				equalHeight($('.columns .col-i'),2);
			})
			.on('click','.color-table .color',function(e){
				e.preventDefault();
				var e = $(this);
				$('.color-table .color').removeClass('active');
				e.addClass('active');
				//e.closest('.wrap-item').find('.btn-form').addClass('active');
			})
			.on('click','.tab-list .tab-title',function(e){
				e.preventDefault();
				var el = $(this);
				el.closest('.wrap-item').find('.tab-item').stop(true,true).slideToggle();
				$('.color-table .wrap-color').css('height',$('.color-table .wrap-color').width());
				$('.eq-height').css('height','auto');
				equalHeight($('.double-col .eq-height'),2);
				$('.columns .col-i').css('height','auto');
				equalHeight($('.columns .col-i'),2);
			})
			.on('click', '.choose-material .choose-item', function (e) {
				e.preventDefault();
				var el = $(this);
				$('.choose-material .choose-item').removeClass('active');
				el.addClass('active');
				var i = el.index();
				var p = el.closest('.tab-item').find('.compare-material');
				p.find('.list').each(function(){
					var $this = $(this);
					$this.find('.compare-item').removeClass('active').hide();
					$this.find('.compare-item').eq(i).fadeIn();
				});
			})
			.on('click', '.js_gallery-more', function(e){
				e.preventDefault();
				$(this).text(function(i, text){
	          return text === "Подробнее" ? "Скрыть информацию" : "Подробнее";
	      })
		    $(this).parents('.item_gallery').find('.item_gallery-toggle').slideToggle(1000);
			});



	//Swiper
	var sliderOption = {
		scrollbar: '.swiper-scrollbar',
		scrollbarHide: false,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 15
	}
	gallerySlider = new Swiper($('.scroll-slider.gallery-slider .swiper-container'),sliderOption);
	scrollSlider = new Swiper($('.scroll-slider.product-slider .swiper-container'),sliderOption);
	scrollSliderSimple = new Swiper($('.scroll-slider.simple-slider .swiper-container'),sliderOption);



	//
	// swiperDot = new Swiper('.swiper-dot',{
  //   //Your options here:
  //   mode:'horizontal',
  //   loop: true,
  //   pagination: '.swiper-dot-pagination',
	// 	paginationClickable: true,
	// 	//createPagination: true
  // });
	//

	$('.swiper-dot').swiper({
		//Your options here:
    mode:'horizontal',
    loop: true,
    pagination: '.swiper-dot-pagination',
		paginationClickable: true,
		//createPagination: true
  });

	$('.swiper-color').swiper({

		scrollbar: '.swiper-scrollbar',
		scrollbarHide: false,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 15,
		//Your options here:
		mode:'horizontal',
		loop: true,
		pagination: '.swiper-color-pagination',
		paginationClickable: true,
		//createPagination: true
	});



	$('.wrap-select select').select2();

});
