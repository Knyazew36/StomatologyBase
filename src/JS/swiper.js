import $ from "jquery";
$(() => {
  const swiper = new Swiper(".swiper", {
    centeredSlides: true,
    autoplay: {
      delay: 5000,
    },
    loop: true,

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-right",
      prevEl: ".swiper-button-left",
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
      },
    },
  });
});
