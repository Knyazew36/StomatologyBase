import parsley from "parsleyjs";
import Inputmask from "inputmask";

import $ from "jquery";
$(() => {
  // parsley
  $("form").parsley({
    errorsContainer: function (ParsleyField) {
      return ParsleyField.$element.closest(".select-wrapper");
    },
  });
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  function handleCheckboxChange(event) {
    if (this.checked) {
      checkboxes.forEach((checkbox) => {
        if (checkbox !== this) {
          checkbox.checked = false;
        }
      });
    }
  }
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  Parsley.addMessages("ru", {
    defaultMessage: "Некорректное значение",
    type: {
      email: "Введите адрес электронной почты",
      url: "Введите URL адрес",
      number: "Введите число",
      integer: "Введите целое число",
      digits: "Введите только цифры",
      alphanum: "Введите буквенно-цифровое значение",
    },
    notblank: "Это поле должно быть заполнено",
    required: "Обязательное поле",
    pattern: "Это значение некорректно",
    min: "Это значение должно быть не менее чем %s",
    max: "Это значение должно быть не более чем %s",
    range: "Это значение должно быть от %s до %s",
    minlength: "Минимум %s символов",
    maxlength: "Это значение должно содержать не более %s символов",
    length: "Это значение должно содержать от %s до %s символов",
    mincheck: "Выберите не менее %s значений",
    maxcheck: "Выберите не более %s значений",
    check: "Выберите от %s до %s значений",
    equalto: "Пароли не совпадают",
  });

  Parsley.setLocale("ru");

  // маска на телефон
  Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false }).mask(
    "[data-mask-phone]",
  );
  // валидация телефона
  window.Parsley.addValidator("phone", {
    requirementType: "string",
    validateString: function (value) {
      const result = value.replaceAll(/\D/g, "");

      return result.length === 11;
    },
    messages: {
      ru: "Заполните поле",
    },
  });

  // маска на дату
  Inputmask({ mask: "99.99.9999", showMaskOnHover: false }).mask(
    "[data-mask-date]",
  );

  // кастом валидатиция на цифры и спецсимволы
  window.Parsley.addValidator("string", {
    requirementType: "string",
    validateString: function (value) {
      const regexp = /[^a-zа-яё\s]/i;

      return !regexp.test(value);
    },
    messages: {
      ru: "Спецсимволы и цифры запрещены",
    },
  });
});
