"use strict";

window.addEventListener("load", () => {
   const burger = document.querySelector(".burger"),
      header = document.querySelector(".header"),
      body = document.querySelector("body");

   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   // let thu = 0;
   // setInterval(() => {
   //    qs(".hero p").style.color = `hsl(${thu}, 100%, 50%)`;
   //    thu++;
   //    if (thu == 358) thu = 0;
   //    console.log(thu);
   // }, 10);
   // ! Burger
   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               burger.classList.remove("active");
               header.classList.remove("active");
               body.classList.remove("lock");
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               body.classList.add("lock");
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (!e.target.closest(".burger") && !e.target.closest(".menu")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
      function closeBurger() {
         //Необязательная дополнительная проверка
         if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            menu.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
   }

   // ! Spoiler

   if (qs(".spoiler")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      // if (qs(".spoiler").classList.contains("opened")) {
      //    let spoilerWrapper = qa(".spoiler__wrapper")[0];
      //    spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      // }

      body.addEventListener("click", toggleSpoiler);

      function toggleSpoiler(e) {
         if (e.target.closest(".spoiler__preview")) {
            e.target.closest(".spoiler").classList.toggle("opened");
            let spoilerWrapper = e.target.closest(".spoiler__preview").nextElementSibling;
            if (!e.target.closest(".spoiler").classList.contains("opened")) {
               spoilerWrapper.style.height = null;
            } else {
               spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
            }
         }
      }
   }

   // ! Home => Hero
   const swiperBanners = new Swiper(".hero__swiper-banners", {
      // loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      simulateTouch: true,
      effect: "fade",
      fadeEffect: {
         crossFade: true,
      },
   });
   const swiperCards = new Swiper(".hero__swiper-cards", {
      // loop: true,
      speed: 500,
      slidesPerView: 1.75,
      initialSlide: 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      breakpoints: {
         568: {
            slidesPerView: 2.25,
         },
         1000: {
            slidesPerView: 3,
         },
      },
   });
   swiperBanners.controller.control = swiperCards;
   swiperCards.controller.control = swiperBanners;

   // ! Cards
   let cards = qa(".cards .card");
   let cardContent = qa(".cards .card__content");
   let cardPreview = qs(".cards .card:nth-child(3) .card__preview");
   let cardBody = qs(".cards .card__body");
   cards.forEach((el) => {
      el.style.height = cardPreview.scrollHeight + cardBody.scrollHeight + "px";
   });
   cardContent.forEach((el) => {
      el.style.top = `calc(100% - ${cardPreview.scrollHeight}px)`;
   });
});
