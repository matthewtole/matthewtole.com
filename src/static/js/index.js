const menu = document.getElementById('mobile-menu');
const menuButton = document.getElementById('btn-mobile-menu');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
