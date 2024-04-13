const menuBtn = document.querySelector('.menu');
const sideBar = document.querySelector('.sidebar');

const startBtn = document.querySelector('button#start');

// Audio Files
const audio1 = new Audio('/sound/singing-bowl-light-14s.mp3');
const audio2 = new Audio('/sound/singing-bowl-deep-20s.mp3');

const listDelay = document.querySelector('#info ul.times li:nth-child(1) span');
const listTime = document.querySelector('#info ul.times li:nth-child(2) span');
const listAudio1 = document.querySelector('#info ul.sounds li:nth-child(1) span');
const listAudio2 = document.querySelector('#info ul.sounds li:nth-child(2) span');

// Circle Timer
const progress = document.querySelector('.progress');
const progress2 = document.querySelector('.progress2');



// Set Default Values to  Local Storage
localStorage.setItem('delay', '10');
localStorage.setItem('time', '20');
localStorage.setItem('audio1', 'High Bowl');
localStorage.setItem('audio2', 'Deep Bowl');

//  Set Default UI Info Box Values
listDelay.innerHTML = localStorage.getItem('delay');
listTime.innerHTML = localStorage.getItem('time');
listAudio1.innerHTML = localStorage.getItem('audio1');
listAudio2.innerHTML = localStorage.getItem('audio2');


// Sidebar Delay Setting
const delaySet = document.querySelectorAll('.delayTimes ul li button');
delaySet.forEach(btn => {
  btn.addEventListener('click', (e) => {
    localStorage.setItem('delay', btn.innerHTML);
    listDelay.innerHTML = localStorage.getItem('delay');
    delaySet.forEach(btn => btn.classList.remove('active'));
    e.target.classList.toggle('active');
  })
})


// Sidebar Meditation Setting
const timeSet = document.querySelectorAll('.medTimes ul li button');
timeSet.forEach(btn => {
  btn.addEventListener('click', (e) => {
    localStorage.setItem('time', btn.innerHTML);
    listTime.innerHTML = localStorage.getItem('time');
    timeSet.forEach(btn => btn.classList.remove('active'));
    e.target.classList.toggle('active');
  })
})



// Main Animation Functions

const setCircleDelay = (delay) => {
  let delayTime = delay*1000;
  // progress.style.strokeDashoffset = 0;
  progress.style.transitionDuration = delay + 's';
  progress.classList.add('animate');
  setTimeout( () => {
    // progress.classList.remove('animate');
  }, delayTime );
}

const setCircleTime = (time) => {
  let medTime = time*1000;
  progress2.style.strokeDashoffset = 0;
  progress2.style.transitionDuration = time + 's';
  progress2.classList.add('animate2');
  setTimeout( () => {
    progress2.classList.remove('animate2');
  }, medTime );
}


// Update UI Info Box
const updateInfoBox = (value, elt) => {
  let intervalID = setInterval(()=> {
    value--;
    if(value < 10) value = '0' + value;
    elt.innerHTML = value;
    if(value <= 0) {
      clearInterval(intervalID);
    }
  }, 1000);
};

// Set Audio Function
const audioPlayer = (audio, vol) => {
  audio.play();
  audio.volume = vol;
};



const medTimer = () => {
  let delay = localStorage.getItem('delay');
  let time = localStorage.getItem('time');

  console.log('delay start');
  updateInfoBox(delay, listDelay);
  setCircleDelay(delay);
 
  startBtn.disabled = true;
  startBtn.classList.add('disabled');

  setTimeout(() => {
    console.log('delay end');
    console.log('meditation start');

    updateInfoBox(time, listTime);
    setCircleTime(time);
    audioPlayer(audio1, 0.4);

    setTimeout(() => { 
      console.log('meditation end');

      audioPlayer(audio2, 0.4);
      audio2.addEventListener('ended', () => {
        startBtn.disabled = false;
        startBtn.classList.remove('disabled');
        console.log('audio2 finished!');

        listDelay.innerHTML = delay;
        listTime.innerHTML = time;
      })  

    }, time*1000)  
  }, delay*1000)

};


menuBtn.addEventListener('click', (e) => {
  sideBar.classList.toggle('open');
  if(!(sideBar.classList.contains('open'))){
    sideBar.addEventListener('transitionend', () => {
      sideBar.style.visibility = 'hidden'
    }, {once: true});
  } else sideBar.style.visibility = 'visible';
})

startBtn.addEventListener('click', e => medTimer());


