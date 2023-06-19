"use strict"

document.addEventListener('DOMContentLoaded', function() {
  const messageForm = document.querySelector('.popup__form');
  messageForm.addEventListener('submit', formSend);
  messageForm.addEventListener('input', handlerInputForm)
  const subjectInput = document.getElementById('formSubject');
  const nameInput = document.getElementById('formName');
  const numberInput = document.getElementById('formNumber');
  const textInput = document.getElementById('formText');

function handlerInputForm(e) {
  const currentForm = e.currentTarget;
    validateForm(currentForm)
}

function validateForm(form) {

    const submitButton = form.querySelector('.btn__view_send')
   if (form.checkValidity()) {
    submitButton.removeAttribute('disabled')
submitButton.classList.add('btn__view_send-valid')
  } else {
    submitButton.setAttribute('disabled', true)
    submitButton.classList.remove('btn__view_send-valid')
}
 }

async function formSend(e) {
  e.preventDefault();




  let formData = new FormData(messageForm);
 
  const form = e.target
 

   const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
    let response = await fetch ('http://localhost:3030/send-email', {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

    if (response.ok) {
      if(form.checkValidity()){
  
      alert("Спасибо за ваше сообщение! Мы перезвоним вам в ближайшее время");
      form.reset();
      
 } else {
  alert('заполните форму')
 }
      
  }
  else {
    console.log("не успешно");
    alert('Error')
  }
}


function numberTest(input){
  return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value)
}

})



const btnOpenPopup = document.querySelector(".btn__view_about");
const popup = document.querySelector(".popup");
const btnClosePopup = document.querySelector(".btn__view_close");
const btnToSend = document.querySelector(".btn__view_send");

function openPopup() {
  popup.classList.add("popup__opened");
}

btnOpenPopup.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup__opened");
}


btnClosePopup.addEventListener("click", closePopup);




function showTime(msg){
   const data = document.querySelector('.header__time');
  let today = new Date();
  let now = today.toLocaleTimeString();
data.innerHTML += `${now}`
}

showTime()

function showYear() {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const year = document.querySelector('.header__data');
  let d = new Date();
  let now = d.toLocaleString('ru', options);
  year.innerHTML += `${now}`
}
showYear()