const $startGameButton = document.querySelector(".start-quiz")
const $questContainer = document.querySelector(".quest-container")
const $answersContainer = document.querySelector(".answers-container")
const $questText = document.querySelector(".quest")
const $nextQuestionButton = document.querySelector(".next-quest")

$startGameButton.addEventListener("click",startGame)
$nextQuestionButton.addEventListener("click", displayNextQuest)

let currentQuestionIndex = 0
let totalCorrect = 0 

function startGame() {
    $startGameButton.classList.add("hide")
    $questContainer.classList.remove("hide")
    displayNextQuest()
}

function displayNextQuest() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)

    })

}

function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }
    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    /*if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }*/

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100/ totalQuestion)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito Bom :)"
            break
        case (performance >= 50):
            message = "Bom"    
            break
        default:
            message = "Pode melhorar :("
    }
    $questContainer.innerHTML = 
    `
    <p class="final-message">
    Você acertou ${totalCorrect} de ${totalQuestion} questões!
    <span>Resultado: ${message} </span>
    </p>
    <button onclick=window.location.reload() class="button">
    Refazer quiz
    </button>
    `
    
}













const questions = [
    {
    question: "A escala natural de dó tem quantas notas ?",
    answers: [
        { text: "5 Notas", correct: false },
        { text: "8 Notas", correct: false },
        { text: "7 Notas", correct: true },
        { text: "6 Notas", correct: false }
    ]
},
{
    question: "Qual é a nota do segundo grau de Dó ?",
    answers: [
        { text: "Ré", correct: true },
        { text: "Mí", correct: false },
        { text: "Sol", correct: false },
        { text: "Lá", correct: false }
    ]
},
{
    question: "Uma Guitarra normalmente possui quantas cordas?",
    answers: [
        { text: "6 cordas", correct: true },
        { text: "8 cordas", correct: false },
        { text: "7 cordas", correct: false },
        { text: "5 cordas", correct: false }
    ]

},
{
    question: "O baterista toca qual instrumento?",
    answers: [
        { text: "Baixo", correct: false },
        { text: "Violão", correct: false },
        { text: "Pandeiro", correct: false },
        { text: "Bateria", correct: true }
    ]
},
{
    question: "Qual objeto o cantor usa durante sua apresentação?",
    answers: [
        { text: "Palheta", correct: false },
        { text: "Pedaleira", correct: false },
        { text: "Microfone", correct: true },
        { text: "Baquetas", correct: false }
    ]
},
{
    question: "Qual dos sequintes instrumentos, o percussionista usa?",
    answers: [
        { text: "Baixo", correct: false },
        { text: "bateria", correct: false },
        { text: "Palheta", correct: false },
        { text: "Pandeiro", correct: true }
    ]
},
{
    question: "Qual instrumento tem o som normalmente mais grave?",
    answers: [
        { text: "Guitarra", correct: false },
        { text: "Baixo", correct: true },
        { text: "Sanfona", correct: false },
        { text: "Bateria", correct: false }
    ]
}
]