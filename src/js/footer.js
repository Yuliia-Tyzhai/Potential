import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('.wt-form');
const formEmail = document.querySelector('.wt-email-input');
const formPhone = document.querySelector('.wt-phone-input');
const errorMessageEmail = document.querySelector('.wt-error-message');
const errorMessagePhone = document.querySelector('.wt-phone-error');
const backdrop = document.querySelector('.backdrop-wt');
const modalWindow = document.querySelector('.modal-wt');
const modalCloseBtn = document.querySelector('.modal-close-btn-wt');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+?[0-9]{11,14}$/;

formEmail.addEventListener('input', function () {
  const email = formEmail.value.trim();
  if (emailPattern.test(email)) {
    formEmail.classList.add('success');
    formEmail.classList.remove('error');
    errorMessageEmail.style.display = 'none';
  } else {
    formEmail.classList.add('error');
    formEmail.classList.remove('success');
    errorMessageEmail.style.display = 'block';
  }
});

formPhone.addEventListener('input', function () {
  const phone = formPhone.value.trim();
  if (phonePattern.test(phone)) {
    formPhone.classList.add('success');
    formPhone.classList.remove('error');
    errorMessagePhone.style.display = 'none';
  } else {
    formPhone.classList.add('error');
    formPhone.classList.remove('success');
    errorMessagePhone.style.display = 'block';
  }
});

formEmail.addEventListener('input', function () {
  localStorage.setItem('email', formEmail.value);
});
formPhone.addEventListener('input', function () {
  localStorage.setItem('phone', formPhone.value);
});

document.addEventListener('DOMContentLoaded', function () {
  const savedEmail = localStorage.getItem('email');
  const savedPhone = localStorage.getItem('phone');
  if (savedEmail) {
    formEmail.value = savedEmail;
  }
  if (savedPhone) {
    formPhone.value = savedPhone;
  }
});

function openModal() {
  document.body.classList.add('no-scroll');
  backdrop.classList.add('is-open');
  modalWindow.classList.add('is-visible');
  modalCloseBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  form.reset();
  localStorage.removeItem('email');
  localStorage.removeItem('phone');
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  backdrop.classList.remove('is-open');
  modalWindow.classList.remove('is-visible');
  modalCloseBtn.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const emailValue = formEmail.value.trim();
  const phoneValue = formPhone.value.trim();

  if (!emailPattern.test(emailValue)) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      backgroundColor: '#ef4040',
      message: 'Некоректний email, спробуйте знову!',
    });
    return;
  }

  if (!phonePattern.test(phoneValue)) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      backgroundColor: '#ef4040',
      message: 'Некоректний номер телефону, спробуйте знову!',
    });
    return;
  }

  try {
    // Відправлення даних на Leeloo
    const response = await axios.post(
      'https://api.leeloo.ai/v1/data', // Замініть на правильний ендпоінт Leeloo
      {
        email: emailValue,
        phone: phoneValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY', // Замініть на реальний API-ключ
        },
      }
    );
    openModal();
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message:
        'Помилка: ' + (error.response?.data?.message || 'Щось пішло не так'),
    });
  }
});
