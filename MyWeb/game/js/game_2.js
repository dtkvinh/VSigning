//question
let words = [
    {
        word: "addition",
        hint: "MeMayBeo"
    },
    {
        word: "meeting",
        hint: "MeMayBeo"
    },
    {
        word: "number",
        hint: "MeMayBeo"
    },
    {
        word: "exchange",
        hint: "MeMayBeo"
    },
    {
        word: "canvas",
        hint: "MeMayBeo"
    },
    {
        word: "garden",
        hint: "MeMayBeo"
    },
    {
        word: "position",
        hint: "MeMayBeo"
    },
    {
        word: "feather",
        hint: "MeMayBeo"
    },
    {
        word: "comfort",
        hint: "MeMayBeo"
    },
    {
        word: "tongue",
        hint: "MeMayBeo"
    },
    {
        word: "expansion",
        hint: "MeMayBeo"
    },
    {
        word: "country",
        hint: "MeMayBeo"
    },
    {
        word: "group",
        hint: "MeMayBeo"
    },
    {
        word: "taste",
        hint: "MeMayBeo"
    },
    {
        word: "store",
        hint: "MeMayBeo"
    },
    {
        word: "field",
        hint: "MeMayBeo"
    },
    {
        word: "friend",
        hint: "MeMayBeo"
    },
    {
        word: "pocket",
        hint: "MeMayBeo"
    },
    {
        word: "needle",
        hint: "MeMayBeo"
    },
    {
        word: "expert",
        hint: "MeMayBeo"
    },
    {
        word: "statement",
        hint: "MeMayBeo"
    },
    {
        word: "second",
        hint: "MeMayBeo"
    },
    {
        word: "library",
        hint: "MeMayBeo"
    },
]
//code

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const box = document.querySelector(".container");
let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    // document.querySelector('.vid video').src = randomObj.word;
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    box.classList.add("active"); //show quiz box
    initGame();
}
