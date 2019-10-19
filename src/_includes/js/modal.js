const disableScroll = new DisableScroll();

const modalOverlay = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const modalButton = document.getElementById('modal-btn-close');
const modalImage = document.getElementById('modal-image');
const modalLoader =
  modalContainer && modalContainer.getElementsByTagName('svg')[0];

if (modalButton) {
  modalButton.addEventListener('click', () => {
    hideModal();
  });
}

if (modalContainer) {
  modalContainer.addEventListener('click', () => {
    hideModal();
  });
}

if (modalImage) {
  modalImage.addEventListener('click', event => {
    event.stopPropagation();
  });

  modalImage.addEventListener('load', () => {
    modalImage.classList.remove('hidden');
    modalLoader.classList.add('hidden');
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
  modalImage.classList.add('hidden');
  modalLoader.classList.remove('hidden');
  modalImage.src = src;
}

[].forEach.call(document.getElementsByClassName('js-gallery-thumb'), thumb => {
  thumb.addEventListener('click', event => {
    event.preventDefault();
    setModalImage(thumb.href);
    showModal();
  });
});
