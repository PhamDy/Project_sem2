
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log (entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el));


$('.image-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1446,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1230,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, 
    {
    breakpoint: 800,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});