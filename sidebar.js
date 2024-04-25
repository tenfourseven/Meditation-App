const viewport = document.querySelector('.viewport');
const menuBtn = document.querySelector('.menu');
const sideBar = document.querySelector('.sidebar');

const delaySet = document.querySelectorAll('.delayTimes ul li button');
const timeSet = document.querySelectorAll('.medTimes ul li button');
const selectFields = document.querySelector('.selectFields')
const startSounds = document.querySelector('.startSounds');
const endSounds = document.querySelector('.endSounds');
const ambientSounds = document.querySelector('.ambientSounds');


// Sidebar Delay Time Setting
delaySet.forEach(btn => {
  if(btn.innerHTML === listDelay.innerHTML) btn.classList.add('active');
  btn.addEventListener('click', (e) => {
    localStorage.setItem('delay', btn.innerHTML); 
    listDelay.innerHTML = localStorage.getItem('delay');
    delaySet.forEach(btn => btn.classList.remove('active'));
    e.target.classList.toggle('active');
  })
})

// Sidebar Meditation Time Setting
timeSet.forEach(btn => {
  if(btn.innerHTML === listTime.innerHTML) btn.classList.add('active');
  btn.addEventListener('click', (e) => {
    localStorage.setItem('time', btn.innerHTML);
    listTime.innerHTML = localStorage.getItem('time');
    timeSet.forEach(btn => btn.classList.remove('active'));
    e.target.classList.toggle('active');
  })
})

// Sidebar SELECT
console.log(selectFields.children);

// function getAllSiblings(element, parent) {
//   const children = [...parent.children];
//   return children.filter(child => child !== element);
// }

function selectAudio(element, audio) {
  // handle dropdown ul
  element.querySelector('.dropdown').addEventListener('click', (e) => {
    element.querySelector('.dropdown-list').classList.toggle('open');
    element.querySelector('.arrow').classList.toggle('rotate');
    // works, but only for two select boxes
    if(element.nextElementSibling !== null) {
      element.nextElementSibling.querySelector('.dropdown-list').classList.remove('open');
      element.nextElementSibling.querySelector('.arrow').classList.remove('rotate');
    }
  }) 
  // tab & enter version -> add tabs for li tags
  element.querySelector('.dropdown').addEventListener('keydown', (e) => {
    Array.from(element.querySelectorAll('.dropdown-list li'))
    .forEach( item => item.setAttribute('tabindex', '0'));  
  })
  // handle select li
  Array.from(element.querySelectorAll('.dropdown-list li'))
  .forEach( item => {
      item.addEventListener( 'click' , (e) => {    
      element.querySelector('p.selected').innerText = e.target.innerText;
      localStorage.setItem(audio, e.target.innerText);
      element.querySelector('.dropdown-list').classList.remove('open');
      element.querySelector('.arrow').classList.toggle('rotate');   
    }) 
  })
// tab & enter version
  Array.from(element.querySelectorAll('.dropdown-list li'))
  .forEach( item => {
      item.addEventListener( 'keydown' , (e) => {    
        if(e.key === 'Enter') {
          Array.from(element.querySelectorAll('.dropdown-list li'))
            .forEach( item => item.removeAttribute('tabindex'));
          element.querySelector('p.selected').innerText = e.target.innerText;
          localStorage.setItem(audio, e.target.innerText);
          element.querySelector('.dropdown-list').classList.remove('open');
          element.querySelector('.arrow').classList.toggle('rotate');   
        }
    }) 
  })  
}

selectAudio(startSounds, 'audio1');
selectAudio(endSounds, 'audio2');
selectAudio(ambientSounds, 'audio3');



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