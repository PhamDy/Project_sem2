const openBtn = document.getElementById('open-cart-btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close-btn');
const backdrop = document.getElementById('backdrop');

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

function openCart() {
  cart.classList.add('open');
  backdrop.style.display = 'block';

  setTimeout(() => {
    backdrop.classList.add('show');
  }, 0);
}

function closeCart() {
  cart.classList.remove('open');
  backdrop.classList.remove('show');

  setTimeout(() => {
    backdrop.style.display = 'none';
  }, 500);
}

// Repeat the pattern for the other sections of your code
// ...

const openMenuBtn = document.getElementById('icon-navbar');
const sideMenu = document.getElementById('sidemenu');
const closeMenuBtn = document.getElementById('close-menu');
const backMenu = document.getElementById('backMenu');

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
backMenu.addEventListener('click', closeMenu);

function openMenu() {
  sideMenu.classList.add('open-menu');
  backMenu.classList.add('show-back');
}

function closeMenu() {
  sideMenu.classList.remove('open-menu');
  backMenu.classList.remove('show-back');
}

const searchBtn = document.getElementById('search-icon');
const search = document.getElementById('search-bar');
const closeSearchBtn = document.getElementById('close-search');
const openSearchBack = document.getElementById('back-of-search');
const backdrop2 = document.getElementById('backdrop2');

searchBtn.addEventListener('click', openSearch);
closeSearchBtn.addEventListener('click', closeSearch);
backdrop2.addEventListener('click', closeSearch);

function openSearch() {
  search.classList.add('opens');
  openSearchBack.classList.add('opens-back');
  backdrop2.style.display = 'block';

  setTimeout(() => {
    backdrop2.classList.add('shows');
  }, 0);
}

function closeSearch() {
  search.classList.remove('opens');
  openSearchBack.classList.remove('opens-back');
  backdrop2.classList.remove('shows');

  setTimeout(() => {
    backdrop2.style.display = 'none';
  }, 500);
}