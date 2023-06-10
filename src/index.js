import $ from 'jquery';
import '@babel/polyfill';
import './index.html';
import './index.scss';
import 'jquery';
import './JS/masked';
import './JS/micromodal';
import './JS/parlsey';
import MicroModal from 'micromodal';

$(function () {
  const $html = $('html');
  $('#phone').mask('+7 (999) 999-99-99');

  const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-right',
      prevEl: '.swiper-button-left',
    },
    mousewheel: {
      invert: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 26,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      890: {
        slidesPerView: 3,
        scrollbar: false,
        spaceBetween: 25,
        loop: true,
      },
    },
  });

  const TOKEN = '5991442621:AAHmPaid3-QaxEkGdlhBhz_izeGYJ1n5j1M';
  const CHAT_ID = '-672673172';
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const form = $('#tg');
  // const success = $('.success');
  let formText = $('.form__text');

  form.on('submit', function (e) {
    e.preventDefault();

    let name = $('#name');
    let phone = $('#phone');

    if (phone.val().length < 10) {
      phone.addClass('animate__animated animate__shakeX');
      setTimeout(() => {
        phone.removeClass('animate__animated animate__shakeX');
        formText.text('Пожалуйста, введите номер телефона');
      }, 1000);
      return;
    }

    let sity = $('.radiobtn:checked').val();
    let message = `<b>Заявка с сайта стоматологии</b>\n <b>Имя отправителя:</b> ${name.val()}\n <b>Телефон:</b> ${phone.val()}\n <b>Город:</b> ${sity}`;
    $('.btn_form').attr('disabled', 'true');
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      .then((res) => {
        // success.fadeOut();
        MicroModal.show('modal-1');
        formText.text('Ваша заявка направлена, ожидайте звонка!');
        formText.addClass('animate__animated animate__pulse');
        name.val('');
        phone.val('');
      })
      .catch((err) => {
        console.warn(err);
      });
  });

  function animatePulse(item) {
    item.addClass('heartBeat');
    setTimeout(() => {
      item.removeClass('heartBeat');
    }, 2000);
  }

  $(
    '.navigation__item a, .header__adress_link, .promo__inner_box a, .btn__cart'
  ).on('click', function (e) {
    e.preventDefault();

    let href = $(this).attr('href');
    let offset = $(href).offset().top;

    $html.animate(
      {
        scrollTop: offset,
      },
      200,
      animatePulse($(href + ''))
    );
  });

  const cartVrn = $('.footer__carts_vrn');
  const cartNov = $('.footer__carts_novov');

  let cartVrnON = 0;
  let cartNovOn = 0;

  cartVrn.on('mouseenter', function () {
    if (cartVrnON == 0) {
      cartVrn.html(
        '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A71f6a8f8d71e27dd63da84db9284abce6645b317610a9e231eb9e26202cadae1&amp;source=constructor" frameborder="0"></iframe>'
      );
      cartVrnON += 1;
    }
  });

  cartNov.on('mouseenter', function () {
    if (cartNovOn == 0) {
      cartNov.html(
        '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeabd1b3e011008b7b74bd568212831ef4fbba1463fbeb91b432276cce9a306a5&amp;source=constructor" frameborder="0"></iframe>'
      );
      cartNovOn += 1;
    }
  });

  $('body').append('<div class="upbtn"></div>');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.upbtn').css({
        right: '-120px',
        bottom: '-120px',
      });
    } else {
      $('.upbtn').css({
        right: '-220px',
        bottom: '-220px',
      });
    }
  });
  $('.upbtn').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > $('table').offset().top - 800) {
      $('table').addClass('animate__animated animate__zoomIn');
      $('table').css({
        opacity: 1,
      });
    }
    if (
      $(this).scrollTop() >
      $('.history__inner-tittle-right').offset().top - 800
    ) {
      $('.history__inner-tittle-right').addClass(
        'animate__animated animate__backInRight'
      );
      $('.history__inner-tittle-right').fadeTo(1);
    }
    if ($(this).scrollTop() > $('.animate2').offset().top - 800) {
      $('.animate2').addClass('animate__animated animate__backInLeft');
      $('.animate2').fadeTo(1);
    }

    if ($(this).scrollTop() > $('.services__row_1 h2').offset().top - 800) {
      $('.services__row_1 h2').addClass(
        'animate__animated animate__backInLeft'
      );
      $('.services__row_1 h2').fadeTo(1);
    }

    if ($(this).scrollTop() > $('.footer__tittle').offset().top - 800) {
      $('.footer__tittle').addClass('animate__animated animate__backInUp');
      $('.footer__tittle').fadeTo(1);
    }
  });
  var $button = $('#menu-btn');

  $button.on('click', function (e) {
    e.preventDefault();
    $('.navigation-bg').toggleClass('navigation-bg_active');

    if ($button.hasClass('open')) {
      $button.removeClass('open');
      $button.addClass('close');
      $('.navigation').hide();
    } else {
      $('.navigation').show();
      $('.navigation').addClass('animate__animated animate__backInRight');
      $button.removeClass('close');
      $button.addClass('open');
    }
  });

  var $width = $(window).width();

  $('.navigation__item').on('click', function () {
    if ($width <= 810) {
      $('.navigation-bg').removeClass('navigation-bg_active');
      $button.removeClass('open');
      $button.addClass('close');
      $('.navigation').hide();
    }
  });
});
