const menu = document.getElementById('mobile-menu');
const menuButton = document.getElementById('btn-mobile-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
