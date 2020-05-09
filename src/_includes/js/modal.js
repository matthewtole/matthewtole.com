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

function showModalInstagram(image, caption, date, link) {
  const modalImage = getModal('instagram').querySelector('.js-modal-image');
  const modalCaption = getModal('instagram').querySelector('.js-modal-caption');
  const modalDate = getModal('instagram').querySelector('.js-modal-date');
  const modalLink = getModal('instagram').querySelector('.js-modal-link');
  modalImage.src = image;
  modalCaption.innerHTML = caption;
  modalDate.innerHTML = date;
  modalLink.setAttribute('href', link);
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

[].forEach.call(document.querySelectorAll('a[data-modal]'), trigger => {
  const modalName = trigger.getAttribute('data-modal');

  trigger.addEventListener('click', event => {
    event.preventDefault();

    switch (modalName) {
      case 'gallery':
        showModalGallery(trigger.href);
        break;
      case 'instagram':
        showModalInstagram(
          trigger.getAttribute('data-instagram-url'),
          trigger.getAttribute('data-instagram-caption'),
          trigger.getAttribute('data-instagram-date'),
          trigger.getAttribute('href')
        );
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
