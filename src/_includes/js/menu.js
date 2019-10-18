const menu = document.getElementById('mobile-menu');
const menuButton = document.getElementById('btn-mobile-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', event => {
    event.preventDefault();
    menu.classList.toggle('hidden');
  });
}
