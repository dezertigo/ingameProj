"use strict";

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   const burger = qs(".burger"),
      header = qs(".header"),
      body = qs("body"),
      menu = qs(".header-menu");

   body.addEventListener("click", clickListeners);
   function clickListeners(e) {
      // ! Burger
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
      } else if (
         !e.target.closest(".burger") &&
         !e.target.closest(".header-menu__container") &&
         qs(".burger").classList.contains("active")
      ) {
         burger.classList.remove("active");
         header.classList.remove("active");
         menu.classList.remove("active");
         body.classList.remove("lock");
         window.removeEventListener("scroll", closeBurger);
      }

      // ! CEO
      if (e.target.closest(".ceo__preview") || e.target.closest(".ceo__btn")) {
         e.target.closest(".ceo").classList.toggle("opened");
         let ceoWrapper = qs(".ceo__preview").nextElementSibling;
         if (!e.target.closest(".ceo").classList.contains("opened")) {
            ceoWrapper.style.height = null;
            qs(".ceo__btn").textContent = "Дивитись більше";
         } else {
            qs(".ceo__btn").textContent = "Сховати";
            ceoWrapper.style.height = ceoWrapper.scrollHeight + "px";
         }
      }

      // ! Step 2
      if (e.target.closest(".step2__preview")) {
         e.target.closest(".step2__spoiler").classList.toggle("opened");
         let spoilerWrapper = e.target.closest(".step2__preview").nextElementSibling;
         if (!e.target.closest(".step2__spoiler").classList.contains("opened")) {
            spoilerWrapper.style.height = null;
         } else {
            spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
         }
      }
      if (e.target.closest(".select__label")) {
         qs(".select__current").textContent = e.target.closest(".select__label").textContent;
      }

      // ! Reviews
      if (qs(".reviews")) {
         const popupReviews = qs(".reviews-popup");
         const reviewsPopupImg = qs(".reviews-popup__item--img");
         const reviewsPopupText = qs(".reviews-popup__item--text");
         const reviewsPopupVideo = qs(".reviews-popup__item--video");

         if (e.target.closest(".reviews__feedback")) {
            qs(".feedback-popup").classList.add("active");
            // setTimeout(() => {
            body.classList.add("lock");
            // }, 300);
         } else if (e.target.closest(".feedback-popup__close")) {
            qs(".feedback-popup").classList.remove("active");
            body.classList.remove("lock");
         }

         if (e.target.closest(".reviews__slide .reviews__img")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupImg.classList.add("active");
         }
         if (e.target.closest(".reviews__slide .reviews__body--video")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupVideo.classList.add("active");
         }
         if (e.target.closest(".reviews__slide .reviews__footer-btn")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupText.classList.add("active");
         }
         if (e.target.closest(".reviews-popup__close")) {
            popupReviews.classList.remove("active");
            body.classList.remove("lock");
            if (
               reviewsPopupImg.classList.contains("active") ||
               reviewsPopupText.classList.contains("active") ||
               reviewsPopupVideo.classList.contains("active")
            ) {
               reviewsPopupImg.classList.remove("active");
               reviewsPopupText.classList.remove("active");
               reviewsPopupVideo.classList.remove("active");
            }
         }
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

   // ! Spoiler base
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
   if (qs("body.home .cards__swiper")) {
      const swiperCards = new Swiper(".cards__swiper", {
         speed: 500,
         slidesPerView: 1,
         initialSlide: 1,
         simulateTouch: true,
         spaceBetween: 20,
         thumbs: {
            swiper: {
               el: ".hero__swiper-cards",
               slidesPerView: 3,
            },
         },
      });
   }

   // ! Cards
   if (qs(".cards")) {
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
   }

   //! Reviews slider
   if (qs(".reviews__slider")) {
      const swiperReviews = new Swiper(".reviews__slider", {
         loop: true,
         speed: 500,
         slidesPerView: 1,
         initialSlide: 1,
         simulateTouch: true,
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
            1200: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
         },
      });
   }

   // todo FIX VIDEO PLAY()
   // body.addEventListener("click", clickVideo);

   // function clickVideo(e) {
   //    if (e.target.closest(".reviews-popup__video svg") || e.target.closest(".reviews-popup__poster")) {
   //       qs("video").style.zIndex = "5";
   //       qs("video").setAttribute("controls", "true");
   //       qs("video").play();
   //       qs(".reviews-popup__poster").style.opacity = "0";
   //    }
   // }

   //! Table swiper (step 3)
   if (qs(".step3__swiper")) {
      const swiperTable = new Swiper(".step3__swiper", {
         speed: 500,
         slidesPerView: 3,
         slidesPerGroup: 3,
         initialSlide: 0,
         simulateTouch: true,
         spaceBetween: 20,
         pagination: {
            el: ".step3__pagination",
            clickable: true,
         },
         navigation: {
            nextEl: ".slider__next",
            prevEl: ".slider__prev",
         },
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
         navigation: {
            nextEl: ".step3__btn-right",
            prevEl: ".step3__btn-left",
         },
      });
   }

   // ! Gallery-vertical
   if (qs(".vertical-gallery__swiper-big")) {
      const swiperVerticalBig = new Swiper(".vertical-gallery__swiper-big", {
         speed: 500,
         slidesPerView: 1,
         initialSlide: 0,
         simulateTouch: true,
         spaceBetween: 12,
         pagination: {
            el: ".vertical-gallery__pagination",
            clickable: true,
         },
         navigation: {
            nextEl: ".vertical-gallery__next",
            prevEl: ".vertical-gallery__prev",
         },
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
   }

   // ! Gallery-horizontal
   if (qs(".horizontal-gallery__swiper-big")) {
      const swiperHorizontalBig = new Swiper(".horizontal-gallery__swiper-big", {
         speed: 500,
         slidesPerView: 1,
         simulateTouch: true,
         spaceBetween: 12,
         sliderPerColumn: 1,
         pagination: {
            el: ".horizontal-gallery__pagination",
            clickable: true,
            // dynamicBullets: true,
            // dynamicMainBullets: 5,
         },
         navigation: {
            nextEl: ".horizontal-gallery__next",
            prevEl: ".horizontal-gallery__prev",
         },
         breakpoints: {
            1000: {
               spaceBetween: 20,
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
      window.addEventListener("resize", fixSlider);
      fixSlider();
      function fixSlider() {
         if (window.innerWidth >= 1000) {
            let bugSlider = qs(".horizontal-gallery__small-wrap");
            let normalSlider = qs(".horizontal-gallery__image-big").getBoundingClientRect().height;
            bugSlider.style.maxHeight = normalSlider + "px";
         }
      }
   }

   // ! Step 1 slider
   if (qs(".step1__swiper")) {
      const packSlider = new Swiper(".step1__swiper", {
         speed: 500,
         slidesPerView: 1,
         initialSlide: 1,
         simulateTouch: true,
         centeredSlides: true,
         slideToClickedSlide: true,
         spaceBetween: 24,
         pagination: {
            el: ".step1__pagination",
            clickable: true,
         },
         navigation: {
            nextEl: ".step1__next",
            prevEl: ".step1__prev",
         },
         breakpoints: {
            568: {
               slidesPerView: 1.5,
            },
            700: {
               slidesPerView: 2.048,
            },
            900: {
               slidesPerView: 2.2,
            },
            1200: {
               slidesPerView: 2.5,
               spaceBetween: 20,
            },
            1400: {
               slidesPerView: 3,
            },
         },
      });
   }
});
