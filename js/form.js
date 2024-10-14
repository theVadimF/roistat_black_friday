// Form popup close/open
document.getElementById("open_form_btn").addEventListener("click", () => {
  document.getElementById("form_popup").classList.add("__shown");
})

const close_popup = (element) => {
  element.classList.remove("__shown")
}

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  const close_btn = popup.querySelector('.close_form');
  const bg = popup.querySelector('.bg');

  close_btn.addEventListener("click", () => close_popup(popup));
  bg.addEventListener("click", () => close_popup(popup));
});

// Init phone input validator/mask
const phone_input = document.getElementById('phone_input');
const phone_iti = intlTelInput(phone_input, {
  strictMode: true,
  utilsScript: './utils.js',
  initialCountry: "ru",
});


// Form validation
const formElement = document.getElementById("form_popup").querySelector(".form_block");
const formStatus = formElement.querySelector('.form_status');

const validateForm = (form) => {
  const nameInput = form.querySelector(".form_input.__name");
  const siteInput = form.querySelector(".form_input.__site");
  const phoneInput = form.querySelector(".form_input.__phone");
  const legalCheck = form.querySelector(".checkbox_input");
  const nameError = form.querySelector('.field_error.__name');
  const siteError = form.querySelector('.field_error.__site');
  const phoneError = form.querySelector('.field_error.__phone');

  const nameRegex = /^[a-zа-яё\ ]{0,}$/i;
  const siteRegex =  /^[^@\ ]+\.[^@\ ]{2,}$/i;

  let flag = true;

  // Hide existing error messages
  form.querySelectorAll('.field_error.__shown').forEach(element => {
    element.classList.remove("__shown");
  });
  // Reset status
  formStatus.classList.remove('__success');
  formStatus.classList.remove('__shown');

  // Check name
  if (!nameInput.value.trim()) {
    nameError.textContent = "Введите имя";
    nameError.classList.add('__shown');
    flag = false;
  } else if (!nameRegex.test(nameInput.value)) {
    nameError.textContent = 'Пожалуйста, используйте только буквы в поле "Имя"';
    nameError.classList.add('__shown');
    flag = false;
  }

  // Check site
  if (!siteInput.value.trim()) {
    siteError.textContent = "Введите сайт";
    siteError.classList.add('__shown');
    flag = false;
  } else if (!siteRegex.test(siteInput.value)) {
    siteError.textContent = "Введите корректный адрес сайта";
    siteError.classList.add('__shown');
    flag = false;
  }

  // Check phone
  if (!phoneInput.value.trim()) {
    phoneError.textContent = "Введите номер телефона";
    phoneError.classList.add('__shown');
    flag = false;
  } else if (!phone_iti.isValidNumberPrecise()) {
    phoneError.textContent = "Введите корректный телефон (пример: 7 900 000-00-00)";
    phoneError.classList.add('__shown');
    flag = false;
  }

  // Legal checkbox
  if (!legalCheck.checked) {
    formStatus.textContent = "Нужно согласиться с политикой обработки персональных данных";
    formStatus.classList.add('__shown');
    flag = false;
  }

  return flag;
}

// Form submit
formElement.querySelector(".__submit_btn").addEventListener("click", async () => {
  if (validateForm(formElement)) {
    const formData = new FormData(formElement);
    try {
      await fetch("/process_form.php", {
        method: "POST",
        body: formData 
      })
      formStatus.textContent = "Регистрация прошла успешно!";
      formStatus.classList.add('__success');
      formStatus.classList.add('__shown');
    } catch(e) {
      formStatus.textContent = "Ошибка отправки данных";
      formStatus.classList.add('__shown');
    }
  }
})

