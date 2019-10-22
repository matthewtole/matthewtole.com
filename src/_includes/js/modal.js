const disableScroll = new DisableScroll();

const modalOverlay = document.querySelector('.js-modal-overlay');

function hide(element) {
  if (element && element.classList) {
    element.classList.add('hidden');
  }
}

function show(element) {
  if (element && element.classList) {
    element.classList.remove('hidden');
  }
}

function getModal(name) {
  return document.querySelector(`.js-modal-container[data-modal="${name}"]`);
}

function showModalGallery(photo) {
  const modalImage = getModal('gallery').querySelector('.js-modal-image');
  const modalLoader = getModal('gallery').querySelector('svg');
  modalImage.src = photo;
  show(modalImage);
  hide(modalLoader);
}

function showModalContent(content) {
  hide(document.querySelector('.js-modal-content:not(.hidden)'));
  show(
    document.querySelector(`.js-modal-content[data-modal-content="${content}"]`)
  );
}

[].forEach.call(document.querySelectorAll('a[data-modal]'), trigger => {
  const modalName = trigger.getAttribute('data-modal');

  trigger.addEventListener('click', event => {
    event.preventDefault();

    if (modalName === 'gallery') {
      showModalGallery(trigger.href);
    } else {
      const modalContent = trigger.getAttribute('data-modal-content');
      showModalContent(modalContent);
    }

    showModal(modalName);
  });
});

[].forEach.call(document.getElementsByClassName('js-modal-close'), button => {
  button.addEventListener('click', () => {
    hideModal();
  });
});

[].forEach.call(
  document.getElementsByClassName('js-modal-container'),
  container => {
    container.addEventListener('click', event => {
      if (event.target.classList.contains('js-modal-container')) {
        hideModal();
      }
    });
  }
);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

function hideModal() {
  const modal = document.querySelector(`.js-modal-container:not(.hidden)`);
  hide(modalOverlay);
  hide(modal);
  disableScroll.off();
}

function showModal(name) {
  const modal = document.querySelector(
    `.js-modal-container[data-modal="${name}"]`
  );
  show(modal);
  show(modalOverlay);
  disableScroll.on();
}
