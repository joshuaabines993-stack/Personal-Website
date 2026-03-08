function hamburg(){
	const navbar = document.querySelector(".dropdown")
	navbar.style.transform = "translateY(0px)"
}

function cancel(){
	const navbar = document.querySelector(".cancel")
	navbar.style.transform = "translateY(-500px)"
}

const dropdownLinks = document.querySelectorAll('.dropdown .links a');
const toggler = document.getElementById('toggler');

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggler.checked = false; // closes the dropdown
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav .links a, .dropdown .links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; 
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-type') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const texts = [
	"BSCS STUDENT",
	"PROGRAMMER",
	"DEVELOPER",
	"POGI",
]

const speed = 100;
const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
	if(characterIndex<texts[textIndex].length) {
       textElements.innerHTML += texts[textIndex].charAt(characterIndex);
       characterIndex++;
       setTimeout(typeWriter, speed);
	}
	else {
		setTimeout(eraseText, 1000);
	}
}
function eraseText(){
	if(textElements.innerHTML.length>0){
		textElements.innerHTML = textElements.innerHTML.slice(0,-1);
		setTimeout(eraseText, 50);
	}
	else{
		textIndex = (textIndex + 1)%texts.length;
		characterIndex = 0;
		setTimeout(typeWriter, 500);
	}
}

window.onload = typeWriter;