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

function showModalInstagram(trigger) {
  const modal = getModal('instagram');
  const modalImage = modal.querySelector('.js-modal-image');
  const modalCaption = modal.querySelector('.js-modal-caption');
  const modalDate = modal.querySelector('.js-modal-date');
  const modalLink = modal.querySelector('.js-modal-link');

  const websiteImage = trigger.querySelector('img').currentSrc;
  modalImage.onload = () => {
    modalImage.classList.remove('hidden');
  };
  modalImage.parentElement.style.backgroundColor = trigger.querySelector(
    'img'
  ).style.backgroundColor;
  modalImage.parentElement.style.backgroundImage = `url('${websiteImage}')`;
  modalImage.src = websiteImage.replace(/\-[0-9]+/, '');
  modalImage.classList.add('hidden');
  modalCaption.innerHTML = trigger.querySelector(
    '.js-instagram-caption'
  ).innerHTML;
  modalDate.innerHTML = trigger.getAttribute('data-instagram-date');
  modalLink.setAttribute('href', trigger.getAttribute('href'));
}

function showModalWebsite(trigger) {
  const modalContent = trigger.getAttribute('data-modal-content');
  const websiteImage = trigger.querySelector('img').getAttribute('src');

  document
    .querySelector(`.js-modal-content[data-modal-content="${modalContent}"]`)
    .querySelector('img')
    .setAttribute('src', websiteImage.replace('-256', '-1024'));
  showModalContent(modalContent);
}

function showModalContent(content) {
  hide(document.querySelector('.js-modal-content:not(.hidden)'));
  show(
    document.querySelector(`.js-modal-content[data-modal-content="${content}"]`)
  );
}

[].forEach.call(document.querySelectorAll('a[data-modal]'), (trigger) => {
  const modalName = trigger.getAttribute('data-modal');

  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    switch (modalName) {
      case 'gallery':
        showModalGallery(trigger.href);
        break;
      case 'instagram':
        showModalInstagram(trigger);
        break;
      case 'website':
        showModalWebsite(trigger);
        break;
      default:
        const modalContent = trigger.getAttribute('data-modal-content');
        showModalContent(modalContent);
    }

    showModal(modalName);
  });
});

[].forEach.call(document.getElementsByClassName('js-modal-close'), (button) => {
  button.addEventListener('click', () => {
    hideModal();
  });
});

[].forEach.call(
  document.getElementsByClassName('js-modal-container'),
  (container) => {
    container.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-modal-container')) {
        hideModal();
      }
    });
  }
);

document.addEventListener('keydown', (event) => {
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
