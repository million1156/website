// Smooth Transition For Everything
const allElements = document.querySelectorAll('*');

allElements.forEach(element => {
   element.style.transition = 'all 1000ms ease-in-out';
});


// Rgb Effect

// Select Card elements 
const elements = document.querySelectorAll('.card');

// Counter 
let counter = 0;

function changeColors() {

  const color = getRandomColor();

  elements.forEach(element => {

    if(element.classList.contains('card')) {
      element.style.setProperty('border-color', color, 'important');
    }

  });

  counter++;
  counter %= elements.length;

  setTimeout(changeColors, 1000);

}



// Random color function
function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Start changing colors
changeColors();

// Next Section: Make Site Mobile Compatible


const sectionOne = document.getElementById('header');
const sectionOneHead = document.getElementById('headertext')
const sectionOneSubtext = document.getElementById('headersubtext')
const sectionOnebutton = document.getElementById('downloadbutton')
const Sectionthree = document.getElementById('featuresection')
const cards = document.getElementsByClassName('card');
let prevMobile = false;

function checkWidth() {
  const isMobile = window.innerWidth <= 1000;

  if(isMobile !== prevMobile) {
    if(isMobile) {
      console.log("Mobile mode on");
      sectionOne.classList.add('flex-column');
      sectionOne.style.marginLeft = "0px";
      sectionOneSubtext.style.marginLeft = "0px"
      sectionOnebutton.style.marginLeft = "0px"
      Sectionthree.classList.add('flex-column');
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('mt-5');
      }
    } else {
      console.log("Mobile mode off");
      sectionOne.classList.remove('flex-column');
      sectionOne.style.marginLeft = "";
      sectionOneSubtext.style.marginLeft = ""  
      sectionOnebutton.style.marginLeft = ""
      Sectionthree.classList.remove('flex-column');
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('mt-5');
      }
    }

    prevMobile = isMobile;
  }
}

// Initial check
checkWidth();

window.addEventListener('resize', checkWidth);

// Next Section : Button Hyperlinks

const downloadbtn = document.getElementById('downloadbtnone')
const discordBtn = document.getElementById('discordbtnone');
const sourceBtn = document.getElementById('sourcebtnone');
const downloadbtn2 = document.getElementById('downloadbutton')
const discordBtn2 = document.getElementById('discordbtnthree');
const sourceBtn2 = document.getElementById('sourcebtntwo');
const sourceBtn3 = document.getElementById('sourcebtnthree');
const downloadBtn3 = document.getElementById('downloadbtnthree')


discordBtn.addEventListener('click', () => {
  const url = 'https://discord.gg/2gQRBp44KT';
  window.open(url, '_blank'); 
});
;

sourceBtn.addEventListener('click', () => {
  const url = 'https://gitlab.com/suyu2/suyu';
  window.open(url, '_blank');
});

downloadbtn.addEventListener('click', () => {
  const url = "download.html"
  window.open(url, '_blank')
})

discordBtn2.addEventListener('click', () => {
  const url = 'https://discord.gg/2gQRBp44KT';
  window.open(url, '_blank'); 
});
;

sourceBtn2.addEventListener('click', () => {
  const url = 'https://gitlab.com/suyu2/suyu';
  window.open(url, '_blank');
});

downloadbtn2.addEventListener('click', () => {
  const url = "download.html"
  window.open(url, '_blank')
})

sourceBtn3.addEventListener('click', () => {
  const url = 'https://gitlab.com/suyu2/suyu';
  window.open(url, '_blank');
});

downloadBtn3.addEventListener('click', () => {
  const url = "download.html"
  window.open(url, '_blank')
})





// Next Section: Functionality

setTimeout(function(){
  document.getElementById('announcement').remove()
}, 7000)