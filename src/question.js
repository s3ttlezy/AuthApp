export class Question {
  constructor() {

  }

  static create(question) {
    return fetch("[YOURLINKTODB]", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">You have no token</p>`)
    }
    return fetch(`[YOURLINKTODB]?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }

        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage()

    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">Вопросов нету</div>`

    const list = document.getElementById("list")
    list.innerHTML = html

  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li style="font-size: 18px">${q.text}</li>`).join("")}</ol>`
      : `<p>Вопросы отсутствуют</p>`
  }
}

function addToLocalStorage(question) {
  const allQuestions = getQuestionsFromLocalStorage()
  allQuestions.push(question)
  localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || '[]')
}

function toCard(question) {
  return `
    <div class="mui-panel">
      <div class="mui--text-black-54"><strong>Дата</strong>: ${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}</div>
      <div class="mui--text-black-54"><strong>Вопрос</strong>: ${question.text}</div>
    </div>
  `
}
