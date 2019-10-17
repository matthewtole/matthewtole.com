const menu = document.getElementById('mobile-menu');
const menuButton = document.getElementById('btn-mobile-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

const disableScroll = new DisableScroll();

const modalOverlay = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const modalButton = document.getElementById('modal-btn-close');
const modalImage = document.getElementById('modal-image');

if (modalButton) {
  modalButton.addEventListener('click', () => {
    hideModal();
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    hideModal();
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

function hideModal() {
  if (!(modalOverlay && modalContainer)) {
    return;
  }
  modalOverlay.classList.add('hidden');
  modalContainer.classList.add('hidden');
  disableScroll.off();
}

function showModal() {
  if (!(modalOverlay && modalContainer)) {
    return;
  }
  modalOverlay.classList.remove('hidden');
  modalContainer.classList.remove('hidden');
  disableScroll.on();
}

function setModalImage(src) {
  if (!modalImage) {
    return;
  }
  modalImage.src = src;
}

[].forEach.call(document.getElementsByClassName('js-gallery-thumb'), thumb => {
  thumb.addEventListener('click', event => {
    event.preventDefault();
    setModalImage(thumb.href);
    showModal();
  });
});
