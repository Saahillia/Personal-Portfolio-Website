// word changing --------------------------------------------------------------------------------------------------
let words = document.querySelectorAll(".word");
words.forEach((word) =>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length-1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i) =>{
        setTimeout(() => {
            letter.className = "letter out";
        }, i*80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter,i) =>{
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        },340 + i*80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
changeText();
setInterval(changeText, 3000);

// Circle Professional Skills ------------------------------------------------------------------------------------------------------
const circles = document.querySelectorAll(".circle");
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked / 100);
    var points = "";
    var rotate = 360 /dots;

    for(let i=0; i< dots; i++){
        points += `<div class="points" style = "--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll(".points");
    for(let i=0; i<percent; i++){
        pointsMarked[i].classList.add("marked");
    }
});


// Mix it up portfolio section---------------------------------------------------------------------------------
var mixer = mixitup('.portfolio-gallery');


// Active Menu section---------------------------------------------------------------------------------
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97  < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// Sticky navbar---------------------------------------------------------------------------------
const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 50);
});

// toggle icon navbar---------------------------------------------------------------------------------
let menuIcon = document.querySelector("#menu-icon i");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    menuIcon.classList.toggle("bxs-menu")
    navlist.classList.toggle("open");
};

window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bxs-menu")
    navlist.classList.remove("open");
};

// Paral lax---------------------------------------------------------------------------------
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));

















// Contact Me form ---------------------------------------------------------------------------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbzEulj0rL9VPgAsNL4x_iinxBsoOfRbHByiU3i3H5zVnhn6N4BY6a7MVVbnoRJkfx13/exec';
// It's often more reliable to use getElementById if your form has an ID.
// Ensure your HTML form has: <form id="contact-form" ...>
const form = document.getElementById('contact-form'); 
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', e => {
    // 1. This is the most important fix. It stops the page from reloading.
    e.preventDefault(); 

    // 2. Give user feedback and prevent multiple clicks
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) {
                swal("Done!", "Your message was sent successfully.", "success");
                form.reset(); // 3. Clear the form fields
            } else {
                // Handle cases where the server responds with an error
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            swal("Error!", "Something went wrong. Please try again.", "error");
        })
        .finally(() => {
            // 4. Re-enable the button whether it succeeded or failed
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
});



