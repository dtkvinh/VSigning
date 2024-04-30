//Initial References
let draggableObjects;
let dropPoints;
let userScore = 5;
const container = document.querySelector('.container');
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const buttonContainer = document.querySelector(".button");
const dropContainer = document.querySelector(".drop-points");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const result_box = document.querySelector(".result_box");
const data = [
  "belgium",
  "bhutan",
  "brazil",
  "china",
  "cuba",
  "ecuador",
  "georgia",
  "germany",
  "hong-kong",
  "india",
  "iran",
  "myanmar",
  "norway",
  "spain",
  "sri-lanka",
  "sweden",
  "switzerland",
  "united-states",
  "uruguay",
  "wales",
];

let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create Touch Event (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let count = 0;

//Random value from Array
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

//Win Game Display
const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

function showResult(){
  // const userScore = 4;
  container.classList.add("hide");
  info_box.classList.remove("activeInfo"); //hide info box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>và chúc mừng! 🎉, Bạn được <p>'+ userScore +'</p> trên <p> 5 điểm </p></span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
  }
  else if(userScore > 2){ // if user scored more than 1
      let scoreTag = '<span>và rất tốt 😎, Bạn được <p>'+ userScore +'</p> Trên <p> 5 điểm </p></span>';
      scoreText.innerHTML = scoreTag;
  }
  else{ // if user scored less than 1
      let scoreTag = '<span>và rất tiếc 😐, Bạn chỉ được <p>'+ Math.max(0, userScore) +'</p> trên <p> 5 điểm </p></span>';
      scoreText.innerHTML = scoreTag;
  }
}

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    container.classList.remove("hide");
    result_box.classList.remove("activeResult");
    buttonContainer.innerHTML = ``;
    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");
    //Events
    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);
      //for touch screen
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });
  })
);

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
  window.location.href = "../game.html"; //reload the current window
}

//Drag & Drop Functions
function dragStart(e) {
  userScore--;
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    //Start movement for touch
    moveElement = true;
    currentElement = e.target;
  } else {
    //For non touch devices set data to be transfered
    e.dataTransfer.setData("text", e.target.id);
  }
}

//Events fired on the drop target
function dragOver(e) {
  e.preventDefault();
}

//For touchscreen movement
const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft -
      (initialX - newX) +
      "px";
    initialX = newX;
    initialY - newY;
    // userScore--;
  }
};

const drop = (e) => {
  e.preventDefault();
  if (isTouchDevice()) {
    moveElement = false;
    //Select country name div using the custom attribute
    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
    //Get boundaries of div
    const currentDropBound = currentDrop.getBoundingClientRect();
    //if the position of flag falls inside the bounds of the countru name
    if (
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add("dropped");
      //hide actual image
      currentElement.classList.add("hide");
      currentDrop.innerHTML = ``;
      //Insert new img element
      currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src= "images/${currentElement.id}.png">`
      );
      count += 1; userScore += 1;
    }
  } else {
    //Access data
    const draggedElementData = e.dataTransfer.getData("text");
    //Get custom attribute value
    const droppableElementData = e.target.getAttribute("data-id");
    if (draggedElementData === droppableElementData) {
      const draggedElement = document.getElementById(draggedElementData);
      //dropped class
      e.target.classList.add("dropped");
      //hide current img
      draggedElement.classList.add("hide");
      //draggable set to false
      draggedElement.setAttribute("draggable", "false");
      e.target.innerHTML = ``;
      //insert new img
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="images/${draggedElementData}.png">`
      );
      count += 1; userScore += 1;
    }
  }
  //Win
  if (count == 3) {
    showResult();
  }
};

//Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  //for string random values in array
  for (let i = 1; i <= 3; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      //If value already exists then decrement i by 1
      i -= 1;
    }
  }
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="images/${i}.png" id="${i}">`;
    dragContainer.appendChild(flagDiv);
  }
  buttonContainer.innerHTML += `<div class="btn" id="btn_1">
    <div class="play"></div>
    <p>Xem video</p>
  </div>
  <div class="clip" id="clip_1">
    <video src="images/video-1.mp4" controls loop></video>
    <b class="close" id="close_1">&times;</b>
  </div>
  <div class="btn" id="btn_2">
    <div class="play"></div>
    <p>Xem video</p>
  </div>
  <div class="clip" id="clip_2">
    <video src="images/video-2.mp4" controls loop></video>
    <b class="close" id="close_2">&times;</b>
  </div>
  <div class="btn" id="btn_3">
    <div class="play"></div>
    <p>Xem video</p>
  </div>
  <div class="clip" id="clip_3">
    <video src="images/video-3.mp4" controls loop></video>
    <b class="close" id="close_3">&times;</b>
  </div>`;
  let btn_1 = document.querySelector('#btn_1');
  let btn_2 = document.querySelector('#btn_2');
  let btn_3 = document.querySelector('#btn_3');
  let clip_1 = document.querySelector('#clip_1');
  let clip_2 = document.querySelector('#clip_2');
  let clip_3 = document.querySelector('#clip_3');
  let close_1 = document.querySelector('#close_1');
  let close_2 = document.querySelector('#close_2');
  let close_3 = document.querySelector('#close_3');
  btn_1.onclick = function (){
      btn_1.classList.add('active');
      clip_1.classList.add('active');
  }
  btn_2.onclick = function (){
      btn_2.classList.add('active');
      clip_2.classList.add('active');
  }
  btn_3.onclick = function (){
      btn_3.classList.add('active');
      clip_3.classList.add('active');
  }
  close_1.onclick = function (){
      btn_1.classList.remove('active');
      clip_1.classList.remove('active');
  }
  close_2.onclick = function (){
      btn_2.classList.remove('active');
      clip_2.classList.remove('active');
  }
  close_3.onclick = function (){
      btn_3.classList.remove('active');
      clip_3.classList.remove('active');
  }
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'></div>`;
    dropContainer.appendChild(countryDiv);
  }
};



// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}
//Start Game
continue_btn.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    // controls.classList.add("hide");
    info_box.classList.add("hide");
    start_btn.classList.add('hide');
    container.classList.remove("hide");
    //This will wait for creator to create the images and then move forward
    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    //Events
    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);
      //for touch screen
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });
  })
);

