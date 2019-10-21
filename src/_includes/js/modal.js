const disableScroll = new DisableScroll();

const modalOverlay = document.querySelector('.js-modal-overlay');

[].forEach.call(
  document.getElementsByClassName('js-modal-trigger'),
  trigger => {
    const modalName = trigger.getAttribute('data-modal');
    const modalContent = trigger.getAttribute('data-modal-content');
    console.log(modalName, modalContent);
    trigger.addEventListener('click', event => {
      event.preventDefault();
      try {
        document
          .querySelector('.js-modal-content:not(.hidden)')
          .classList.add('hidden');
      } catch (ex) {}
      document
        .querySelector(
          `.js-modal-content[data-modal-content="${modalContent}"]`
        )
        .classList.remove('hidden');
      showModal(modalName);
    });
  }
);

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

// if (modalContainer) {
//   modalContainer.addEventListener('click', () => {
//     hideModal();
//   });
// }

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

// const modalContainer = document.getElementById('modal-container');
// const modalButton = document.getElementById('modal-btn-close');
// const modalImage = document.getElementById('modal-image');
// const modalLoader =
//   modalContainer && modalContainer.getElementsByTagName('svg')[0];

// if (modalImage) {
//   modalImage.addEventListener('click', event => {
//     event.stopPropagation();
//   });

//   modalImage.addEventListener('load', () => {
//     modalImage.classList.remove('hidden');
//     modalLoader.classList.add('hidden');
//   });
// }

function hideModal() {
  const modal = document.querySelector(`.js-modal-container:not(.hidden)`);
  if (!(modalOverlay && modal)) {
    return;
  }
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');
  disableScroll.off();
}

function showModal(name) {
  const modal = document.querySelector(
    `.js-modal-container[data-modal="${name}"]`
  );
  if (!(modalOverlay && modal)) {
    return;
  }
  modalOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  disableScroll.on();
}

// function setModalImage(src) {
//   if (!modalImage) {
//     return;
//   }
//   modalImage.classList.add('hidden');
//   modalLoader.classList.remove('hidden');
//   modalImage.src = src;
// }

// [].forEach.call(document.getElementsByClassName('js-gallery-thumb'), thumb => {
//   thumb.addEventListener('click', event => {
//     event.preventDefault();
//     setModalImage(thumb.href);
//     showModal();
//   });
// });
