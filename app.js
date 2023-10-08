const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });

  if (!Boolean(Number(isAllValid))) {
    alert("Заповніть поля правильно!");
    return;
  }
  formSubmit();
}
async function formSubmit() {
  const data = serializeForm(form); // получаем данные формы
  const response = await sendData(data); // отправляем данные на почту
  if (response.ok) {
    let result = await response.json(); // если ответ OK отвечает пользователю
    alert(result.message); // .. что данные отправлены
    formReset(); // сбрасываем поля формы
  } else {
    alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
  }
}

function serializeForm(formNode) {
  // формируем данные формы
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("send_mail.php", {
    // отправляем в скрипт send_mail.php
    method: "POST", // методом POST
    body: data,
  });
}

function formReset() {
  // сброс полей формы
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-valid", 0);
    el.style.border = "none";
  });
}
