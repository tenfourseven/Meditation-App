const startBtn = document.querySelector('button#start');

const listDelay = document.querySelector('#info ul.times li:nth-child(1) span');
const listTime = document.querySelector('#info ul.times li:nth-child(2) span');

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
localStorage.setItem('audio3', 'Forest');

//  Set Default UI Time Values
listDelay.innerHTML = localStorage.getItem('delay');
listTime.innerHTML = localStorage.getItem('time');

// Main UI Display
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

initSVG(250);
initCircleTimer(progress1);
initCircleTimer(progress2);



// Main Animation Functions
const setCircleDelay = (delay) => {
  let delayTime = delay*1000;
  progress1.style.strokeDashoffset = 0;
  progress1.classList.add('animate1');
  progress1.style.transitionDuration = delay + 's';
 
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
  
  setTimeout( () => {
    // reset timer
    progress2.classList.remove('animate2');
    let circumference = progress2.getAttribute('r')*2*Math.PI;
    progress2.style.strokeDashoffset = Math.ceil(circumference);
    progress2.style.transitionDuration = '0s';
  }, medTime );
}


// Update UI Times
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


// Main Meditaion Function 

const medTimer = () => {

  // Audio Init
  const audio1 = new Howl({ src: ['sound/tap-notification-180637_441.mp3'],
  volume: 0.3, preload: true });
  const audio2 = new Howl({ src: ['sound/tap-notification-180637_441.mp3'],
  volume: 0.3, preload: true });
  const audio3 = new Howl({ src: ['sound/forest-with-small-river-birds-and-nature-field-recording-6735.mp3'],
  volume: 0.3, preload: true });

  let delay = localStorage.getItem('delay');
  let time = localStorage.getItem('time');

  updateInfoBox(delay, listDelay);
  setCircleDelay(delay);
  startBtn.disabled = true;
  startBtn.classList.add('disabled');

  setTimeout(() => {
    updateInfoBox(time, listTime);
    setCircleTime(time);
     audio1.play();
     audio1.volume = 0.2;
     audio3.play();
     audio3.volume = 0.4;

    setTimeout(() => { 
      audio3.stop();
      audio2.play();
      audio2.volume = 0.2;
      audio2.on('end', function(){
        
        startBtn.disabled = false;
        startBtn.classList.remove('disabled');

        listDelay.innerHTML = delay;
        listTime.innerHTML = time;
      }) 
    }, time*1000)  
  }, delay*1000)
};


startBtn.addEventListener('click', e => {
  medTimer()
});


// THEMEN

// close dropdown on sidebar closed

// Sound Sync -> Laggy 0n Chrome (Android 8)
// Remove unused event listeners ?!


// Responsive / Viewport Adjustments
// Browser Testing
// Accessibility Tests
// UI Themes -> Default: Indigo Dark

// disable orientation landscape on mobile


