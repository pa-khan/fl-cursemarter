var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {
	// Fields
	let fields = document.querySelectorAll('.field');

	if (fields) {
		fields.forEach((field) => {
			new Field(field);

			if (field.classList.contains('--phone')) {
				field.area.mask = IMask(field.area, {
					mask: '+{7} (000) 000-00-00',
					lazy: true
				});
				field.area.addEventListener('focusin', () => {
					field.area.mask.updateOptions({
						lazy: false
					})
				});
				field.area.addEventListener('focusout', () => {
					field.area.mask.updateOptions({
						lazy: true
					})
				})
			} else {
				field.area.addEventListener('input', () => {
				});
			}
		});
	}


	const $cases = document.querySelector('.cases');
	if ($cases) {
		$cases.$items = $cases.querySelectorAll('.cases__item');
		$cases.$btnMore = $cases.querySelector('.cases__btn-more');
		$cases.currentIndex = 0;

		if ($cases.$items.length > 0) {
			showCasesItem($cases.currentIndex);
			$cases.$btnMore.addEventListener('click', () => {
				$cases.currentIndex++;
				showCasesItem($cases.currentIndex);
			});
		}


		function showCasesItem(index) {
			const el = $cases.$items[index];
			if (el) {
				el.classList.add('--show');
				if (!$cases.$items[index + 1]) {
					$cases.$btnMore.classList.add('--hide');
				}
			}
		}
	}


	const $reviews = document.querySelector('.reviews');
	if ($reviews) {
		$reviews.$wrap = $reviews.querySelector('.reviews__wrap');
		$reviews.$arrowPrev = $reviews.querySelector('.reviews__arrow.swiper-button-prev');
		$reviews.$arrowNext = $reviews.querySelector('.reviews__arrow.swiper-button-next');
		$reviews.$pagination = $reviews.querySelector('.reviews__pagination');

		new Swiper($reviews.$wrap, {
			speed: 900,
			loop: true,
			navigation: {
				nextEl: $reviews.$arrowNext,
				prevEl: $reviews.$arrowPrev,
			},
			pagination: {
				el: $reviews.$pagination,
				type: 'bullets',
				clickable: true
			}

		});
	}


	const $callBtns = document.querySelectorAll('.btn-call');
	if ($callBtns.length > 0) {
		$callBtns.forEach(($btn) => {
			$btn.addEventListener('click', (e) => {
				if (document.body.offsetWidth > 768) {
					e.preventDefault();

					Fancybox.show([
						{
							src: '#modal-callback',
							type: 'inline'
						}
					])
				}
			});
		});
	}

	// UP BTN
	document.addEventListener("scroll", upBtnScroll);
	let upBtn = document.querySelector(".up");

	function upBtnScroll() {
		let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		let ratio = 0.05;

		if ((document.documentElement.scrollTop / scrollableHeight) > ratio) {
			upBtn.classList.add('--show')
		} else {
			upBtn.classList.remove('--show')
		}
	}

	upBtn.addEventListener("click", scrollToTop);

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}


	const $modalCloseBtns = document.querySelectorAll('.modal__close');
	if ($modalCloseBtns.length > 0) {
		$modalCloseBtns.forEach(($btn) => {
			$btn.addEventListener('click', () => {
				Fancybox.close();
			});

		});
	}


	// VALIDATION
	let validateForms = document.querySelectorAll('form');
	if (validateForms) {
		validateForms.forEach((form) => {
			let btnSubmit = form.querySelector('button');
			let inputsRequired = form.querySelectorAll('.field.--required');

			btnSubmit.addEventListener('click', (event) => {
				event.preventDefault();
				let errors = 0;

				if (inputsRequired.length > 0) {
					inputsRequired.forEach((input) => {
						let value = input.area.value;

						if (input.classList.contains('--name')) {
							if (value.length < 2) {
								errors++;
								input.classList.add('--error');
							} else {
								input.classList.remove('--error');
							}
						}

						if (input.classList.contains('--phone')) {
							if (value.length < 18) {
								errors++;
								input.classList.add('--error');
							} else {
								input.classList.remove('--error');
							}
						}

					})
				}



				if (errors == 0) {
					let xhr = new XMLHttpRequest();
					let formData = new FormData(form);
					xhr.open('POST', 'order.php');
					xhr.send(formData);

					xhr.onload = function () {
						if (xhr.response == "1") {
							Fancybox.close();

							Fancybox.show([{
								src: '#modal-thanks',
								type: 'inline'
							}]);

							form.reset();


							setTimeout(() => {
								Fancybox.close();

							}, 2000);

						}
					}
				}
			})
		})
	}

});