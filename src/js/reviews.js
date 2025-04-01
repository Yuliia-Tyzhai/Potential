import Swiper from 'swiper/bundle';

const reviews = [
  {
    avatar_url: '/img/reviews/reviews-1.jpg',
    author: 'Олексій Д.',
    review:
      'Завдяки їхньому командному підходу ми оптимізували HR-процеси і досягли нових висот в управлінні персоналом.',
    rating: 5,
  },
  {
    avatar_url: '/img/reviews/reviews-2.jpg',
    author: 'Дмитро М.',
    review:
      'Після співпраці з ними ми отримали значні поліпшення в нашому HR-менеджменті та підвищили ефективність компанії.',
    rating: 5,
  },
  {
    avatar_url: 'img/reviews/reviews-3.jpg',
    author: 'Іван С.',
    review:
      'Завдяки їхньому професіоналізму та компетентності, наші бізнес-процеси стали більш ефективними та продуктивними.',
    rating: 5,
  },
  {
    avatar_url: '/src/img/reviews/reviews-4.jpg',
    author: 'Марина К.',
    review:
      'Їхній індивідуальний підхід та професійні поради дозволили нам сформувати HR-відділ, який дійсно працює на бізнес.',
    rating: 5,
  },
  {
    avatar_url: 'src/img/reviews/reviews-5.jpg',
    author: 'Світлана Ж.',
    review:
      'Їхні рекомендації щодо управління персоналом допомогли нам не лише оптимізувати HR-процеси, а й значно підвищити прибутки.',
    rating: 4.5,
  },
  {
    avatar_url: './src/img/reviews/reviews-6.jpg',
    author: 'Арда М.',
    review:
      'Співпраця з цією консалтинговою компанією принесла нам цінні інсайти та практичні рішення для поліпшення бізнесу.',
    rating: 4.5,
  },
];

const reviewList = document.querySelector('.reviews-list');

function createReviewLi(reviewData) {
  const fullStars = Math.floor(reviewData.rating);
  const hasHalfStar = reviewData.rating % 1 !== 0;
  const fullStarsMarkup = '<span>★</span>'.repeat(fullStars);
  const halfStarMarkup = hasHalfStar ? '<span class="half-star">★</span>' : '';
  const starsMarkup = fullStarsMarkup + halfStarMarkup;

  return `
     <li class="reviews-list-item swiper-slide">
        <div class="reviews-list-item-header">
          <img src="${reviewData.avatar_url}" alt="${reviewData.author}" class="reviews-list-item-img" />
          <h3 class="reviews-list-item-author">${reviewData.author}</h3>
        </div>
        <div class="reviews-stars">
          ${starsMarkup}
        </div>
        <p class="reviews-list-item-text">${reviewData.review}</p>
     </li>
   `;
}

const renderCard = reviews => {
  const markup = reviews.map(createReviewLi).join('');
  reviewList.insertAdjacentHTML('beforeend', markup);
};

renderCard(reviews);

const swiperReviews = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 700,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  grabCursor: true,

  mousewheel: {
    invert: false,
  },
});
