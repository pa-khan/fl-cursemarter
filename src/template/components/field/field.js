'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Field {
  static addError(element, message) {
    element.classList.add(Field.classError);

    if (message) {
      element.querySelector('.field__message').innerText = message;
    }
  }

  constructor(element) {
    this.element = element;
    this.area = this.element.querySelector('.field__area');

    this.element.area = this.area;

    if (this.area.value != '') {
      this.element.classList.add(Field.classFilled);
    }

    this.onFocus();
    this.onInput();
  }


  onFocus() {
    this.element.addEventListener('click', () => {
      this.area.focus();
      this.element.classList.remove(Field.classError);
      this.element.classList.add(Field.classFocus);
    });
    this.element.addEventListener('focusin', () => {
      this.element.classList.add(Field.classFocus);
    });
    this.element.addEventListener('focusout', () => {
      this.element.classList.remove(Field.classFocus);
    });
  }

  onInput() {
    this.area.addEventListener('input', () => {
      if (this.area.value != '') {
        this.element.classList.add(Field.classFilled);
      } else {
        this.element.classList.remove(Field.classFilled);
      }
    });
  }

}

_defineProperty(Field, "classFocus", '--focus');

_defineProperty(Field, "classFilled", '--filled');

_defineProperty(Field, "classError", '--error');