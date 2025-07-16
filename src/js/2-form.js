const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.js-feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

/* Завантаження даних із локального сховища у форму */
function loadFormData(form) {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData) return;

  Object.keys(savedData).forEach(key => {
    if (form.elements[key]) {
      form.elements[key].value = savedData[key];
      formData[key] = savedData[key];
    }
  });
}

loadFormData(refs.form);

/* Зберігання введення у formData і localStorage */

function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

refs.form.addEventListener('input', handleInput);

/* Обробка сабміту форми */

function handleSubmit(event) {
  event.preventDefault();

  const isAnyFieldEmpty = Object.values(formData).some(value => value === '');

  if (isAnyFieldEmpty) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  refs.form.reset();
}

refs.form.addEventListener('submit', handleSubmit);
