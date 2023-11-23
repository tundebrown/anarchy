const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    //MOUSE WHEEL
    mousewheel: {
        invert: true,
        eventsTarget:	'swipper'
      },

      //ANIMATE
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false
      },

      //EFFECTeffect: "cube",
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          origin: "left center",
          translate: ["-60%", 0, -200],
          rotate: [0, 100, 0],
        },
        next: {
          origin: "right center",
          translate: ["-60%", 0, -200],
          rotate: [0, -100, 0],
        },
    }
  });