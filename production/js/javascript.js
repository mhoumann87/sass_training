// copyright notice
const copyPos = document.querySelector('#copy');
const year = new Date().getFullYear();
if (year === 2019) {
  copyPos.innerHTML = `Webdesign &copy;${year} Michael Houmann`;
} else {
  copyPos.innerHTML = `Webdesign &copy;2019 - ${year} Michael Houmann`;
}

/* 
* Sticky Navigation from #30daysJavascript project
*/

// Store the nav in a variable
const nav = document.querySelector('nav');

// Get the distance form the top of the site to the top of the nav 
let topOfNav = nav.offsetTop;

function fixNav() {
  // If the page has scrolled pass the top of the nav,
  // fix the navbar to the top, using a css style
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');

    //if the top of the nav isn't passed the top of the page
    // remove the css-style, and let the navbar move
  } else {
    nav.classList.remove('fixed-nav');
  }
}

// When user scrolls the page, calculate where the navbar are
window.addEventListener('scroll', fixNav);

/* 
* Calculate and show how many days are left of the project
*/

// Store tag for the information on the page
const dayPos = document.querySelector('.days');

//get the unix timestamp for all the relevant days

// Unix time for thursday, januar 3 2019 midnight GMT in seconds = 1546473600;
const startDate = (Date.parse('Thu, Jan 3 1:00:00 2019')) / 1000;

// One day in uxni time = 86400
const oneDay = 60 * 60 * 24;
console.log(oneDay);
// Calculate end day in unix time code april 13 2019
const endDay = (oneDay * 100) + startDate;

// Find now in unix time seconds
let now = Math.floor(new Date().getTime() / 1000);

// calculate days left of project
let daysLeft = Math.floor((endDay - now) / oneDay);

// Show the result on the page
dayPos.innerText = `${daysLeft} days left of the project`;


/*
* Smooth scroll-animation based on https://www.youtube.com/watch?v=oUSvlrDTLi4
*/

// get the navbar
const navBar = document.querySelector('.navbar');

// Get an array of the buttons in the navbar
const buttons = navBar.querySelectorAll('li');

function smoothScroll(target) {
  let startPos = 0;
  let targetDiv = document.querySelector(target);
  let targetTop = targetDiv.getBoundingClientRect().top;
  let distance;
  let duration = 1000;
  let startTime = null;

  distance = startPos + targetTop;

  //animation based on requestAnimationTime read more https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    console.log(startTime);
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPos, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Ease function from http://www.gizma.com/easing/
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  // When the animation is done, reset the start position to the new postion
  startPos = window.scrollY;
  requestAnimationFrame(animation);
}



// Set an eventListener on each button and run the animation on click
buttons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    smoothScroll(event.target.hash);
  });
})
