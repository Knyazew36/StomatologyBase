import $ from "jquery";
import "@babel/polyfill";
import "./index.html";
import "./index.scss";
import "jquery";
import "./JS/masked";
import "./JS/micromodal";
import "./JS/parlsey";
import "./JS/swiper";
import MicroModal from "micromodal";
import { myForm } from "./JS/form";

window.addEventListener("DOMContentLoaded", () => {
  myForm();

  $(function () {
    function animatePulse(item) {
      item.addClass("heartBeat");
      setTimeout(() => {
        item.removeClass("heartBeat");
      }, 2000);
    }

    $(
      ".navigation__item a, .header__adress_link, .promo__inner_box a, .btn__cart",
    ).on("click", function (e) {
      e.preventDefault();

      let href = $(this).attr("href");
      let offset = $(href).offset().top;

      const html = $("html");
      html.animate(
        {
          scrollTop: offset,
        },
        200,
        animatePulse($(href + "")),
      );
    });

    const cartVrn = $(".footer__carts_vrn");
    const cartNov = $(".footer__carts_novov");

    let cartVrnON = 0;
    let cartNovOn = 0;

    cartVrn.on("mouseenter", function () {
      if (cartVrnON == 0) {
        cartVrn.html(
          '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A71f6a8f8d71e27dd63da84db9284abce6645b317610a9e231eb9e26202cadae1&amp;source=constructor" frameborder="0"></iframe>',
        );
        cartVrnON += 1;
      }
    });

    cartNov.on("mouseenter", function () {
      if (cartNovOn == 0) {
        cartNov.html(
          '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeabd1b3e011008b7b74bd568212831ef4fbba1463fbeb91b432276cce9a306a5&amp;source=constructor" frameborder="0"></iframe>',
        );
        cartNovOn += 1;
      }
    });

    $("body").append('<div class="upbtn"></div>');
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".upbtn").css({
          right: "-120px",
          bottom: "-120px",
        });
      } else {
        $(".upbtn").css({
          right: "-220px",
          bottom: "-220px",
        });
      }
    });
    $(".upbtn").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        300,
      );
      return false;
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > $("table").offset().top - 800) {
        $("table").addClass("animate__animated animate__zoomIn");
        $("table").css({
          opacity: 1,
        });
      }
      if (
        $(this).scrollTop() >
        $(".history__inner-tittle-right").offset().top - 800
      ) {
        $(".history__inner-tittle-right").addClass(
          "animate__animated animate__backInRight",
        );
        $(".history__inner-tittle-right").fadeTo(1);
      }
      if ($(this).scrollTop() > $(".animate2").offset().top - 800) {
        $(".animate2").addClass("animate__animated animate__backInLeft");
        $(".animate2").fadeTo(1);
      }

      if ($(this).scrollTop() > $(".services__row_1 h2").offset().top - 800) {
        $(".services__row_1 h2").addClass(
          "animate__animated animate__backInLeft",
        );
        $(".services__row_1 h2").fadeTo(1);
      }

      if ($(this).scrollTop() > $(".footer__tittle").offset().top - 800) {
        $(".footer__tittle").addClass("animate__animated animate__backInUp");
        $(".footer__tittle").fadeTo(1);
      }
    });
    var $button = $("#menu-btn");

    $button.on("click", function (e) {
      e.preventDefault();
      $(".navigation-bg").toggleClass("navigation-bg_active");

      if ($button.hasClass("open")) {
        $button.removeClass("open");
        $button.addClass("close");
        $(".navigation").hide();
      } else {
        $(".navigation").show();
        $(".navigation").addClass("animate__animated animate__backInRight");
        $button.removeClass("close");
        $button.addClass("open");
      }
    });

    var $width = $(window).width();

    $(".navigation__item").on("click", function () {
      if ($width <= 810) {
        $(".navigation-bg").removeClass("navigation-bg_active");
        $button.removeClass("open");
        $button.addClass("close");
        $(".navigation").hide();
      }
    });
  });
});
