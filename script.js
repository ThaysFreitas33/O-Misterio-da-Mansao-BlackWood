const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

// Accordion functionality
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    const isOpen = accordion.classList.contains('open');

    // Reset all accordions
    accordions.forEach(acc => {
      acc.textContent = acc.textContent.replace('Fechar', 'Clique para ver o conteúdo');
      acc.classList.remove('open');
    });

    // Toggle current accordion
    if (!isOpen) {
      accordion.textContent = accordion.textContent.replace('Clique para ver o conteúdo', 'Fechar');
      accordion.classList.add('open');
    }
  });
});
