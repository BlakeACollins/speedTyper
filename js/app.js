const word = document.getElementById('word'),
      text = document.getElementById('text'),
      scoreEl = document.getElementById('score'),
      timeEl = document.getElementById('time'),
      endgameEl = document.getElementById('end-game-container'),
      settingsBtn = document.getElementById('settings-btn'),
      settings = document.getElementById('settings'),
      settingsForm = document.getElementById('settings-form'),
      difficultySelect = document.getElementById('difficulty');


//List of words

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'laboratory', 
  'photocopy',
  'chemistry',
  'advocate',
  'current',
  'prospect',
  'exposure',
  'cheque',
  'horseshoe',
  'horseshoe',
  'chimney',
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;
//Local storage for difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
//set difficulty value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


//Focus on text box when page is loaded
text.focus();

//Start counting down 
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

//Add word to DOm
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

//update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

//Game over show end screen
function gameOver() {
    endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;
  
    endgameEl.style.display = 'flex';
  }

addWordToDOM();

//Event Listeners
text.addEventListener('input', e=>{
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        //Clear input
        e.target.value = '';

        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time += 3;
        }else{
            time += 5;
        }

        updateTime();
    }
});

//Settings btn
// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});