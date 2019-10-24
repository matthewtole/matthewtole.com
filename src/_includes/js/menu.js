const menu = document.getElementById('mobile-menu');
const menuButton = document.getElementById('btn-mobile-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', event => {
    event.preventDefault();
    menu.classList.toggle('hidden');
  });
}

fetch('https://api.netlify.com/api/v1/sites', {
  headers: {
    Authorization:
      'Bearer 9e9d02b2ab7de82742f008edb992ab3eb9196a928a089a7038a643bac857b43d',
  },
})
  .then(response => response.json())
  .then(console.log)
  .catch(console.error);
