"use strict";

window.addEventListener("load", () => {
   const burger = document.querySelector(".burger"),
      header = document.querySelector(".header"),
      body = document.querySelector("body"),
      menu = qs(".header-menu");
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
               menu.classList.remove("active");
               body.classList.remove("lock");
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               body.classList.add("lock");
               menu.classList.add("active");
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (!e.target.closest(".burger") && !e.target.closest(".header-menu")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            menu.classList.remove("active");
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
   // ! Header
   // window.addEventListener("resize", moveCart); // todo написать не при ресайзе, а при перевороте мобилки в другое положение (горизонталь\вертикаль)
   moveCart();
   function moveCart() {
      if (window.innerWidth < 1000) {
         qs(".header-top__buttons").prepend(qs("#cart"));
      } else {
         qs(".header-menu__container").append(qs("#cart"));
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

   // ! CEO
   if (qs(".ceo")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      // if (qs(".spoiler").classList.contains("opened")) {
      //    let spoilerWrapper = qa(".spoiler__wrapper")[0];
      //    spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      // }
      const ceoBtn = document.querySelector(".ceo__btn");
      ceoBtn.addEventListener("click", toggleCeo);

      function toggleCeo(e) {
         if (e.target.closest(".ceo__preview") || e.target.closest(".ceo__btn")) {
            e.target.closest(".ceo").classList.toggle("opened");
            let ceoWrapper = document.querySelector(".ceo__preview").nextElementSibling;
            if (!e.target.closest(".ceo").classList.contains("opened")) {
               ceoWrapper.style.height = null;
               ceoBtn.textContent = "Дивитись більше";
            } else {
               ceoBtn.textContent = "Сховати";
               ceoWrapper.style.height = ceoWrapper.scrollHeight + "px";
            }
         }
      }
   }

   // ! Home => Hero
   // const swiperBanners = new Swiper(".hero__swiper-banners", {
   //    // loop: true,
   //    speed: 500,
   //    slidesPerView: 1,
   //    initialSlide: 1,
   //    simulateTouch: true,
   //    effect: "fade",
   //    fadeEffect: {
   //       crossFade: true,
   //    },
   // });
   const swiperCards = new Swiper(".cards__swiper", {
      // loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      simulateTouch: true,
      spaceBetween: 20,
      // effect: "fade",
      // fadeEffect: {
      //    crossFade: true,
      // },
   });
   const swiperHeroCards = new Swiper(".hero__swiper-cards", {
      // loop: true,
      speed: 500,
      slidesPerView: 1.75,
      initialSlide: 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      simulateTouch: true,
      breakpoints: {
         568: {
            slidesPerView: 2.25,
         },
         1000: {
            slidesPerView: 3,
         },
      },
   });
   swiperCards.controller.control = swiperHeroCards;
   swiperHeroCards.controller.control = swiperCards;

   // // ! Cards
   // let cards = qa(".cards .card");
   // let cardContent = qa(".cards .card__content");
   // let cardPreview = qs(".cards .card:nth-child(2) .card__preview");
   // let cardBody = qs(".cards .card__body");
   // cards.forEach((el) => {
   //    el.style.height = cardPreview.scrollHeight + cardBody.scrollHeight + "px";
   // });
   // cardContent.forEach((el) => {
   //    el.style.top = `calc(100% - ${cardPreview.scrollHeight}px)`;
   // });

   // ! Cards
   let cards = qa(".cards .card");
   let cardContent = qa(".cards .card__content");

   let cardsPreview = qa(".cards .card .card__preview");
   let cardsPreviewHeight = [];
   cardsPreview.forEach((el) => {
      cardsPreviewHeight.push(el.scrollHeight);
   });
   // Узнаем макисмальную высоту превьюшки карточки квеста
   let maxPreviewHeight = Math.max(...cardsPreviewHeight);

   let cardBody = qa(".cards .card__body");
   let cardsBodyHeight = [];
   cardBody.forEach((el) => {
      cardsBodyHeight.push(el.scrollHeight);
   });
   // Узнаем макисмальную высоту спрятанной части карточки квеста
   let maxBodyHeight = Math.max(...cardsBodyHeight);

   // В эту переменную передадим высоту превьюшки после увелечения шрифта
   let finalHeight = maxPreviewHeight;
   function resizeLayout(e) {
      if (e.target.closest(".card")) {
         let newPreviewHeight = e.target.closest(".card").children[1].firstElementChild.scrollHeight;
         // Проверяем стала ли высота превьюшки больше чем любая другая на странице
         if (newPreviewHeight > finalHeight) {
            cards.forEach((el) => {
               let maxHeight = newPreviewHeight + maxBodyHeight;
               finalHeight = newPreviewHeight;
               // Если стала - увеличиваем все превьюшки до одного размера
               el.style.height = maxHeight + "px";
            });
         }
      }
   }
   // 
   // Задаем базовую высоту карточке
   cards.forEach((el) => {
      el.style.height = maxPreviewHeight + maxBodyHeight + "px";
   });
   body.addEventListener("pointerover", resizeLayout);
   // Возвращаем превьюшку(а точнее все тело, но ненужную его часть не видно) в область видимости карточки (в самый её низ)
   cardContent.forEach((el) => {
      el.style.top = `calc(100% - ${maxPreviewHeight}px)`;
   });

   // reviews slider
   const swiperReviews = new Swiper(".reviews__slider", {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      spaceBetween: 24,
      pagination: {
         el: ".reviews__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".reviews__next",
         prevEl: ".reviews__prev",
      },
      breakpoints: {
         568: {
            slidesPerView: 1.5,
         },
         700: {
            slidesPerView: 1.9299,
         },
         900: {
            slidesPerView: 2,
         },
         1100: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
      },
   });
   const reviewsPopupSlider = new Swiper(".reviews-popup__slider", {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      spaceBetween: 24,
      pagination: {
         el: ".reviews-popup__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".reviews-popup__next",
         prevEl: ".reviews-popup__prev",
      },
   });

   // ! Footer
   // Telegram hover
   document.body.addEventListener("pointerover", changeTelegramColor);

   function changeTelegramColor(e) {
      if (e.type == "pointerdown") {
         if (e.target.closest(".footer-top__subscribe a")) {
            e.preventDefault();
            qa(".footer-top__subscribe .not")[0].classList.remove("hover");
            qa(".footer-top__subscribe .not")[1].classList.remove("hover");
            qa(".footer-top__subscribe .not")[0].classList.add("clicked");
            qa(".footer-top__subscribe .not")[1].classList.add("clicked");
            document.body.addEventListener("pointerup", removeStylesUp);
         }
      } else if (e.type == "pointerover") {
         if (e.target.closest(".footer-top__subscribe a")) {
            qa(".footer-top__subscribe .not")[0].classList.add("hover");
            qa(".footer-top__subscribe .not")[1].classList.add("hover");
            document.body.addEventListener("pointerdown", changeTelegramColor);
            document.body.addEventListener("pointerout", removeStylesOut);
         }
      }
   }
   function removeStylesUp(e) {
      console.log("up");
      qa(".footer-top__subscribe .not")[0].classList.remove("clicked");
      qa(".footer-top__subscribe .not")[1].classList.remove("clicked");
      document.body.removeEventListener("pointerdown", changeTelegramColor);
      document.body.removeEventListener("pointerup", removeStylesUp);
      document.body.removeEventListener("pointerout", removeStylesOut);
   }
   function removeStylesOut(e) {
      qa(".footer-top__subscribe .not")[0].classList.remove("hover");
      qa(".footer-top__subscribe .not")[1].classList.remove("hover");
      document.body.removeEventListener("pointerdown", changeTelegramColor);
      // document.body.removeEventListener("pointerup", removeStylesUp);
      document.body.removeEventListener("pointerout", removeStylesOut);
   }
   //! Table swiper
   const swiperTale = new Swiper(".step3__swiper", {
      // loop: true,
      speed: 500,
      slidesPerView: 3,
      slidesPerGroup: 3,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 20,
      freeMode: true,
      breakpoints: {
         500: {
            slidesPerView: 4,
            slidesPerGroup: 4,
         },
         620: {
            slidesPerView: 5,
            slidesPerGroup: 5,
         },
         740: {
            slidesPerView: 7,
            slidesPerGroup: 7,
         },
      },
   });

   // ! Slider-vertical
   const swiperVerticalBig = new Swiper(".vertical-gallery__swiper-big", {
      // loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 12,
      thumbs: {
         swiper: {
            el: ".vertical-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               500: {
                  slidesPerView: 4,
                  spaceBetween: 14,
               },
               600: {
                  slidesPerView: 5,
               },
               1000: {
                  spaceBetween: 20,
                  slidesPerView: 5,
               },
               1200: {
                  slidesPerView: 6,
               },
            },
         },
      },
   });
   // const swiperVerticalSmall = new Swiper(".vertical-gallery__swiper-small", {
   //    // loop: true,
   //    speed: 500,
   //    slidesPerView: 3,
   //    initialSlide: 0,
   //    slideToClickedSlide: true,
   //    spaceBetween: 12,
   //    breakpoints: {
   //       500: {
   //          slidesPerView: 4,
   //          spaceBetween: 14,
   //       },
   //       1000: {
   //          slidesPerView: 5,
   //          spaceBetween: 20,
   //       },
   //       1200: {
   //          slidesPerView: 6,
   //       },
   //    },
   // });
   // swiperVerticalSmall.controller.control = swiperVerticalBig;
   // swiperVerticalBig.controller.control = swiperVerticalSmall;

   window.addEventListener("resize", fixSlider);
   fixSlider();
   function fixSlider() {
      if (window.innerWidth >= 1000) {
         let bugSlider = document.querySelector(".horizontal-gallery__small-wrap");
         let normalSlider = document.querySelector(".horizontal-gallery__big-wrap").getBoundingClientRect().height;
         bugSlider.style.maxHeight = normalSlider + "px";
      }
   }
   // ! Slider-horizontal
   const swiperHorizontalBig = new Swiper(".horizontal-gallery__swiper-big", {
      // loop: true,
      speed: 500,
      slidesPerView: 1,
      simulateTouch: true,
      spaceBetween: 12,
      sliderPerColumn: 1,
      breakpoints: {
         1000: {
            spaceBetween: 0,
         },
      },
      thumbs: {
         swiper: {
            el: ".horizontal-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               500: {
                  slidesPerView: 4,
                  spaceBetween: 10,
               },
               600: {
                  slidesPerView: 5,
               },
               700: {
                  slidesPerView: 6,
               },
               1000: {
                  spaceBetween: 20,
                  slidesPerView: 6,
                  direction: "vertical",
               },
            },
         },
      },
   });
   // ! BREAK
   // const swiperHorizontalSmall = new Swiper(".horizontal-gallery__swiper-small", {
   //    loop: true,
   //    speed: 500,
   //    slidesPerView: 3,
   //    initialSlide: 0,
   //    slideToClickedSlide: true,
   //    spaceBetween: 12,
   // breakpoints: {
   //    500: {
   //       slidesPerView: 4,
   //       spaceBetween: 10,
   //    },
   //    600: {
   //       slidesPerView: 5,
   //    },
   //    700: {
   //       slidesPerView: 6,
   //    },
   //    1000: {
   //       spaceBetween: 20,
   //       slidesPerView: 6,
   //    },
   // },
   // });
   // swiperHorizontalSmall.controller.control = swiperHorizontalBig;
   // swiperHorizontalBig.controller.control = swiperHorizontalSmall;
});
