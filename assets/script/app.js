'use strict';

function onEvent(event, selector, callback){
  return selector.addEventListener(event, callback);
}

function select(selector){
  return document.querySelector(selector);
}

function create(element){
  return document.createElement(element);
}

const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const start = document.getElementById('start');
const countdownDiv = document.querySelector('.countdownDiv');
const inputText = document.querySelector('.inputText');
const dvTime = document.querySelector('.time');
const dvGivenWords = document.querySelector('#givenWords');

const spcompleteAmount = select('#completeAmount');
const scoreDiv = select('.scoreDiv');
const btnhistory = select('#history');
const dvdialog = select('.dialog');
const dvsubDialog = select('#subDialog');
const audioClick = select('#keydown');
const audioNextWord = select('#nextword');
const audioCountdown = select('#countdown');
const audioMissionComplete = select('#missionComplete');
const audioBackgroundMusic = select('#audioBackgroundMusic');
const audioWrong = select('#wrong');
let intervalId = 0;
let currentIndex = 0;
let totalSeconds = 15;   // set the time can be used in total
let timeUsed = 0;
let isGameStart = false;
let scores = [];
let isbtnStartEnable = true;

dvTime.innerHTML = totalSeconds;

inputText.disabled = true;
// const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot'];

const words = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 
  'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 
  'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon',
  'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 
  'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 
  'chocolate', 'eleven', 'technology', 'promise', 'alphabet', 'knowledge', 'magician', 'professor',
  'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer', 
  'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom',
  'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 
  'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
  'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard',
  'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope','download', 'blue', 'actor', 
  'desk', 'watch', 'giraffe', 'brazil', 'mask', 'audio', 'school', 'detective', 'hero', 
  'progress', 'winter', 'passion', 'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 
  'resort', 'escape'
  ];

inputText.value = '';
runAnimation();
function resetDOM() {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');
    
  nums.forEach(num => {
    num.classList.value = '';
  });

  nums[0].classList.add('in');
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const penultimate = nums.length - 1;
    num.addEventListener('animationend', (e) => {
      if(e.animationName === 'goIn' && idx !== penultimate){
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName === 'goOut' && num.nextElementSibling){
        num.nextElementSibling.classList.add('in');
      } else {
        counter.classList.add('hide');
        finalMessage.classList.add('show');
      }
    });
  });
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

start.addEventListener('click', () => {
  if(!isbtnStartEnable) return;
  isbtnStartEnable = false;
  resetDOM();
  isGameStart = true;
  countdownDiv.style.display = 'grid'; 
  clearInterval(intervalId);
  inputText.disabled = true;
  setTimeout(() => {
      initiation();
    }, 3500);
  audioBackgroundMusic.pause();
  audioMissionComplete.pause();
  audioCountdown.pause();
  shuffleArray(words);
  playSound(audioCountdown);
  scoreDiv.style.display = 'none';
});

function initiation(){
  countdownDiv.style.display = 'none'; 
  isbtnStartEnable = true;
  inputText.value = '';
  inputText.disabled = false;
  inputText.focus();
  start.innerText = 'Restart';
  currentIndex = 0;
  timeUsed = 0;
  dvTime.innerText = totalSeconds;
  intervalId = setInterval(showTime, 1000);
  dvGivenWords.innerHTML = generateWordHTML(words[0]);
  playSound(audioBackgroundMusic);
}

dvdialog.addEventListener('click', () =>{
  dvdialog.style.display ='none';
  audioMissionComplete.pause();
})

function showTime(){
  timeUsed ++;
  dvTime.innerText = totalSeconds - timeUsed;
  if(timeUsed >= totalSeconds){
    clearInterval(intervalId);
    showScore();
    isGameStart = false;
  }
}

function generateWordHTML(word){
  let t = '';
  for(let i = 0; i < word.length; i++){
    t += `<p id="pw${i}">${word[i]}</p>`
  }
  return t;
}

onEvent('input', inputText, textChange)
function textChange(){
  if(isGameStart){
    
    let inputed = inputText.value;
    let wordLenght = words[currentIndex].length;

    for(let i = 0; i < wordLenght; i++){
      const p = select(`#pw${i}`);
      if(i < inputed.length){
        if(words[currentIndex][i] === inputed[i]){
          p.style.backgroundColor = '#1f9f87';
          // playSound(audioClick);   
        } else {
          p.style.backgroundColor = '#f44336';
          playSound(audioWrong);
        }
      } else {
        p.style.backgroundColor = '';
      }
    }
    if(words[currentIndex] === inputed){
      currentIndex ++;
      spcompleteAmount.innerText = currentIndex;
      if(currentIndex == words.length){
        clearInterval(intervalId);
        dvGivenWords.innerHTML = '';
        inputText.value = '';
        inputText.focus();
        showScore();
      } else {
        dvGivenWords.innerHTML = generateWordHTML(words[currentIndex]);
        inputText.value = '';
        inputText.focus();
      }
      playSound(audioNextWord);
    }

  }
}

function playSound(audio){
  audio.currentTime = 0.1;
  audio.play();
}

//will use Score class here
function showScore(){
  let percentage = (currentIndex/words.length) * 100 ;
  // const newScore = new Score('Ken', currentIndex, percentage.toFixed(2), timeUsed)  // using class
  const newScore = createScoreObject(currentIndex, percentage.toFixed(2), timeUsed);  // not using class
  scores.push(newScore);
  sortScores();
  // show score
  dvdialog.style.display = 'grid';
  let scoreHTML = '<h1>Congratulation!!</h1>';
  scoreHTML += '<h2>Here is your score:</h2>';
  scoreHTML += createRecord(newScore, -1);
  scoreHTML += '<button id="ok">OK</button>';
  dvsubDialog.innerHTML = scoreHTML;
  const btnOK = select('#ok');
  btnOK.focus();
  playSound(audioMissionComplete);
  spcompleteAmount.innerText = '0';
  audioBackgroundMusic.pause();
  saveScoresToLocal();
  inputText.disabled = true;
}

onEvent('click', btnhistory, showHistory)
function showHistory(){
  if(scoreDiv.style.display == 'block'){
    scoreDiv.style.display ='none';
  } else {
    scoreDiv.style.display ='block';
    let histories = '<h4>High scores</h4>';
    if(scores.length > 0){
      for(let i = 0; i < scores.length; i++){
        const score = scores[i];
        histories += createRecord(score, i);
        if(scores.length > 1 && i < scores.length - 1){
          histories += '<div class="spliter"></div>';
        }
        histories += '<div class="spliter2"></div>';
      }
    } else {
      histories += '<p class="norecord">No record yet</p>';
    }
    scoreDiv.innerHTML = histories;
  }
}

onEvent('click', scoreDiv, hideHistory)
function hideHistory(){
  scoreDiv.style.display ='none';
}

function createRecord(score, index){
  let html = '';
  //html += `<p><span class="scoreCategory">Name: </span><span>${score.name}</span></p>`;
  if(index != -1){
    html += `<h2>#${index + 1}</h2>`;
  }
  html += `<p><span class="scoreCategory">Date: </span><span">${score.date}</span></p>`;
  html += `<p><span class="scoreCategory">Hits: </span><span>${score.hits}</span></p>`;
  html += `<p><span class="scoreCategory">Percentage: </span><span>${score.percentage}%</span></p>`;
  html += `<p><span class="scoreCategory">Time Used: </span><span> ${score.timeUsed} seconds</span></p>`;
  return html;
}

readLocalScores();
function readLocalScores(){
  let localScores = localStorage.getItem('speedyTyper');
  if(localScores === null) return;
  const scoreT = localScores.split('$');
  for(let i = 0; i < scoreT.length && i < 9; i++){
    const T1 = scoreT[i].split('|');
    const objT = {
      date: T1[0].replace(/"/g, ''),
      hits: parseInt(T1[1]),
      percentage: T1[2].replace(/"/g, ''),
      timeUsed: parseInt(T1[3])
    }
    scores.push(objT);
  }
  sortScores();
}

function saveScoresToLocal(){
  let localScores = '';
  for(let i = 0; i < 9 && i < scores.length; i++){
    const score = scores[i];
    localScores += JSON.stringify(score.date) + '|' + JSON.stringify(score.hits) + '|' 
    + JSON.stringify(score.percentage) + '|' + JSON.stringify(score.timeUsed);
    if(i < 8 && i < scores.length - 1){
      localScores += '$';
    } 
  }
  localStorage.setItem('speedyTyper', localScores);
}

function createScoreObject(hits, percentage, timeUsed){
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0'); 
  let day = String(now.getDate()).padStart(2, '0');
  let year = now.getFullYear();
  let date = `${hours}:${minutes} ${month}-${day}-${year}`;

  const objT = {
    date: date,
    hits: hits,
    percentage: percentage,
    timeUsed: timeUsed
  }
  return objT;
}

function sortScores(){
  scores.sort((a, b) => {
    if (a.hits !== b.hits) {
      return  b.hits - a.hits; // Sort by hits in ascending order
    } else {
      return a.timeUsed - b.timeUsed; // If hits are equal, sort by timeUsed in descending order
    }
  });
  if(scores.length > 9){
    scores = scores.slice(0, 9);
  }
}

// localStorage.removeItem('speedyTyper');