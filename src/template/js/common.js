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
				IMask(field.area, {
					mask: '+{7} (000) 000-00-00',
					// lazy: false,
				})
			}
		});
	}


	// Checks
	let checks = document.querySelectorAll('.check');

	if (checks) {
		checks.forEach((check) => {
			new Check(check);
		});
	}


});