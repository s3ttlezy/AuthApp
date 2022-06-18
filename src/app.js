import { Question } from "./question";
import { isValid, modalInit } from "./utils";
import { authWithEmailAndPassword, getAuth } from "./auth";
import './static/script'
import './static/style.css'

const form = document.getElementById("form")
const authModal = document.querySelector("#auth-modal")
const input = form.querySelector("#formInput")
const submitBtn = form.querySelector("#submit")

window.addEventListener("load", Question.renderList)
form.addEventListener("submit", submitFormHandler)
authModal.addEventListener("click", openModal)
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    submitBtn.disabled = true
    input.disabled = true

    //  Async request to server to save question
    Question.create(question).then(() => {
      input.value = ""
      input.className = ""
      submitBtn.disabled = false
      input.disabled = false
    })

  }
}

function openModal() {
  modalInit("Authorization", getAuth())
  document
    .getElementById('authForm')
    .addEventListener("submit", authFormHandler, {once: true})
}

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#emailInput').value
  const password = event.target.querySelector('#passwordInput').value

  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    modalInit(`Ошибка`, content)
  } else {
    modalInit(`<p style="color: darkseagreen">Вопросы</p>`, Question.listToHTML(content))
  }
}

/*
* todo Реализовать карточки проектов
* */
