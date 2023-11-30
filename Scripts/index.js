console.log('привет')
//import '../vendor/vendor.css'

import { Popup } from "./Popup.js";

const popupWithForm = new Popup({
    popupSelector:'#popupcontainer',

  })

const btnOpenPopup = document.querySelector(".btn__view_about");

popupWithForm.setEventListeners()


btnOpenPopup.addEventListener("click", () => {
  popupWithForm.open()
  console.log('тык')
});



  const popupConfirmation = new Popup({
    popupSelector: "#popupconfirm"
  })


popupConfirmation.setEventListeners()

document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.querySelector(".popup__form");
  messageForm.addEventListener("submit", formSend);
  messageForm.addEventListener("input", handlerInputForm);
  const subjectInput = document.getElementById("formSubject");
  const nameInput = document.getElementById("formName");
  const numberInput = document.getElementById("formNumber");
  const textInput = document.getElementById("formText");
  const formInput = document.querySelector(".popup__form-input");

  

  function handlerInputForm(e) {
    const currentForm = e.currentTarget;
    validateForm(currentForm);
    validateInput(e.target);
  }

  function validateForm(form) {
    const submitButton = form.querySelector(".btn__view_send");
    if (form.checkValidity()) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("btn__view_send-valid");
    } else {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.remove("btn__view_send-valid");
    }
  }

  function validateInput(input) {
    addCustomErrorMessage(input);

    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;

    if (errorElement) {
      input.classList.add("popup__form-input-error");
      input.removeAttribute('valid')

    } else {
      input.classList.remove("popup__form-input-error");
      input.setAttribute('valid', true)
    }
  }

  function addCustomErrorMessage(input) {
    
    input.setCustomValidity('')

    if (input.validity.valueMissing) {
      input.setCustomValidity("Обязательное поле");
    } 

   else if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity("Должно быть от 2 до 30 символов");
    } 

   else if (input.validity.patternMismatch && input.type === "tel") {
      input.setCustomValidity("Должно быть номером телефона");
    } 

  }

  async function formSend(e) {
    e.preventDefault();

    let formData = new FormData(messageForm);

    const form = e.target;

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    let response = await fetch("http://localhost:3030/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      if (form.checkValidity()) {
        
      popupConfirmation.open()
    
        form.reset();
      } else {
        alert("Пожалуйста, заполните все обязательные поля");
      }
    } else {
      console.log("не успешно");
      alert("Error");
    }
  }


});

//const popup = document.querySelector(".popup");
const btnClosePopup = document.querySelector(".btn__view_close");
const btnToSend = document.querySelector(".btn__view_send");

/*function openPopup() {
  popup.classList.add("popup__opened");
  console.log('opened')
}*/



/*function closePopup() {
  popup.classList.remove("popup__opened");
}

btnClosePopup.addEventListener("click", closePopup);*/



