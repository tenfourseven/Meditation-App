
const delaySet = document.querySelectorAll('.delayTimes ul li button');
const timeSet = document.querySelectorAll('.medTimes ul li button');
const selectFields = document.querySelector('.selectFields')
const startSounds = document.querySelector('.startSounds');
const endSounds = document.querySelector('.endSounds');

// Sidebar Delay Setting
delaySet.forEach(btn => {
  if(btn.innerHTML === listDelay.innerHTML) btn.classList.add('active');
  btn.addEventListener('click', (e) => {
    localStorage.setItem('delay', btn.innerHTML); 
    listDelay.innerHTML = localStorage.getItem('delay');
    delaySet.forEach(btn => btn.classList.remove('active'));
    e.target.classList.toggle('active');
  })
})

// Sidebar Meditation Setting
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

function selectAudio(element, audio, infoPanel ) {
  // handle dropdown ul
  element.querySelector('.dropdown').addEventListener('click', (e) => {
    element.querySelector('.dropdown-list').classList.toggle('open');
    // works, but only for two select boxes
    if(element.nextElementSibling !== null) {
      element.nextElementSibling.querySelector('.dropdown-list').classList.remove('open');
      element.nextElementSibling.querySelector('.arrow').classList.remove('rotate');
    }
   
    element.querySelector('.arrow').classList.toggle('rotate');
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
      infoPanel.innerHTML = localStorage.getItem(audio);
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
          infoPanel.innerHTML = localStorage.getItem(audio);
          element.querySelector('.dropdown-list').classList.remove('open');
          element.querySelector('.arrow').classList.toggle('rotate');   
        }
    }) 
  })  
}

selectAudio(startSounds, 'audio1', listAudio1);
selectAudio(endSounds, 'audio2', listAudio2);



  // ['click','keydown'].forEach( evt => 
  //   testBtn.addEventListener(evt, (e) => {
  //     console.log(e.key);
  //   }, false)
  // );