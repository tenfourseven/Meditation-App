const viewport = document.querySelector('.viewport');
const menuBtn = document.querySelector('.menu');
const sideBar = document.querySelector('.sidebar');

const startBtn = document.querySelector('button#start');

// Audio Files
const audio1 = new Audio('/sound/tap-notification-180637.ogg');
const audio2 = new Audio('/sound/tap-notification-180637.ogg');
// const audio1 = new Audio('/sound/singing-bowl-light-14s.mp3');
// const audio2 = new Audio('/sound/singing-bowl-deep-20s.mp3');
audio1.preload = 'auto';
audio2.preload = 'auto';


const listDelay = document.querySelector('#info ul.times li:nth-child(1) span');
const listTime = document.querySelector('#info ul.times li:nth-child(2) span');
const listAudio1 = document.querySelector('#info ul.sounds li:nth-child(1) span');
const listAudio2 = document.querySelector('#info ul.sounds li:nth-child(2) span');

// Circle Timer
const svgbox = document.querySelector('.svgbox');
const circle = document.querySelector('.circle');
const progress1 = document.querySelector('.progress1');
const progress2 = document.querySelector('.progress2');

// Set Default Values to  Local Storage
localStorage.setItem('delay', '10');
localStorage.setItem('time', '10');
localStorage.setItem('audio1', 'High Bowl');
localStorage.setItem('audio2', 'Deep Bowl');

//  Set Default UI Info Box Values
listDelay.innerHTML = localStorage.getItem('delay');
listTime.innerHTML = localStorage.getItem('time');
listAudio1.innerHTML = localStorage.getItem('audio1');
listAudio2.innerHTML = localStorage.getItem('audio2');

const initSVG = (svg_size) => {
  svgbox.style.width = `${svg_size}px`;
  svgbox.querySelectorAll('circle').forEach(circle => {
    circle.setAttribute('r', (svg_size / 2) - 4);
    circle.setAttribute('cx', svg_size / 2);
    circle.setAttribute('cy', svg_size / 2);
  })
}

const initCircleTimer = (element) => {
  let circumference = element.getAttribute('r')*2*Math.PI;
  element.style.strokeDasharray = Math.ceil(circumference);
  element.style.strokeDashoffset = Math.ceil(circumference);
}

initSVG(240);
initCircleTimer(progress1);
initCircleTimer(progress2);

// Main Animation Functions

const setCircleDelay = (delay) => {
  let delayTime = delay*1000;
  progress1.style.strokeDashoffset = 0;
  progress1.classList.add('animate1');
  progress1.style.transitionDuration = delay + 's';
  progress1.addEventListener('transitionend', () => {
    console.log('transition ended');
    audioPlayer(audio1, 0.5);
  })
 
  setTimeout( () => {
    // reset delay
    progress1.classList.remove('animate1');
    let circumference = progress1.getAttribute('r')*2*Math.PI;
    progress1.style.strokeDashoffset = Math.ceil(circumference);
    progress1.style.transitionDuration = '0s';
   
  }, delayTime );
}

const setCircleTime = (time) => {
  let medTime = time*1000;
  progress2.style.strokeDashoffset = 0;
  progress2.classList.add('animate2');
  progress2.style.transitionDuration = time + 's';
  progress2.addEventListener('transitionend', () => {
    console.log('transition ended');
    audioPlayer(audio2, 0.4);
  })
  
  setTimeout( () => {
    // reset timer
    progress2.classList.remove('animate2');
    let circumference = progress2.getAttribute('r')*2*Math.PI;
    progress2.style.strokeDashoffset = Math.ceil(circumference);
    progress2.style.transitionDuration = '0s';
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

// Main Meditaion Function 

const medTimer = () => {
  let delay = localStorage.getItem('delay');
  let time = localStorage.getItem('time');

  //console.log('delay start');
  updateInfoBox(delay, listDelay);
  setCircleDelay(delay);
 
  startBtn.disabled = true;
  startBtn.classList.add('disabled');

  setTimeout(() => {
    console.log('delay end');
    //console.log('meditation start');

    updateInfoBox(time, listTime);
    setCircleTime(time);
    // audioPlayer(audio1, 0.4);

    setTimeout(() => { 
      // console.log('meditation end');

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


// Toggle Sidebar / Disable on Key
menuBtn.addEventListener('click', () => {
  sideBar.classList.toggle('open');
  if(!(sideBar.classList.contains('open'))){
    sideBar.addEventListener('transitionend', () => {
      sideBar.style.visibility = 'hidden'
    }, {once: true});
  } else sideBar.style.visibility = 'visible';
})

// Close Sidebar on Display Click
viewport.addEventListener('click', (e) => {
  if(sideBar.classList.contains('open')){
    if(!(sideBar.contains(e.target)) && e.target !== menuBtn){
      sideBar.classList.toggle('open');
      sideBar.addEventListener('transitionend', () => {
        sideBar.style.visibility = 'hidden'
      }, {once: true});
    }
  }
});


startBtn.addEventListener('click', e => medTimer());



// Sound Sync
// Remove unused event listeners ?!


// Responsive / Viewport Adjustments
// Browser Testing
// Accessibility Tests
// UI Themes -> Default: Indigo Dark


