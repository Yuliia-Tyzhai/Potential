const mobileMenu = document.querySelector('.mobile-menu');
const openBtn = document.querySelector('.mobile-menu-open-btn');
const closeBtn = document.querySelector('.mobile-menu-close-btn');
const menuLinks = document.querySelectorAll('.mobile-nav-list a');

openBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  openBtn.style.display = 'none';
  closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  openBtn.style.display = 'block';
  closeBtn.style.display = 'none';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none';
  });
});
