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

document.querySelectorAll('.skills-box-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
        const fills = wrapper.querySelectorAll('.progress-fill');
        fills.forEach((fill,index) => {
            fill.style.width = '0%'; // reset before hover
            const target = parseInt(fill.getAttribute('data-width'));
            const percentEl = fill.closest('.progress-bar').previousElementSibling.querySelector('.percentage');
            percentEl.innerText = '0%';
            setTimeout(() => {
                // animate fill
                fill.style.width = target + '%';

                // animate number
                let count = 0;
                const interval = setInterval(() => {
                    if(count >= target) clearInterval(interval);
                    else percentEl.innerText = ++count + '%';
                }, 15); // speed of counting
            }, index * 300); // sequential
        });
    });

    wrapper.addEventListener('mouseleave', () => {
        const fills = wrapper.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
            fill.style.width = '0%';
            const percentEl = fill.closest('.progress-bar').previousElementSibling.querySelector('.percentage');
            percentEl.innerText = '0%';
        });
    });
});

const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    sendBtn.disabled = true;

    statusMessage.innerHTML = "<span class='spinner'></span> Sending...";
    statusMessage.className = "sending";

    emailjs.sendForm(
        "service_zcgig9m",
        "template_9a2gvzx",
        this
    ).then(function(){

        statusMessage.innerHTML = "✓ Message Sent Successfully!";
        statusMessage.className = "success";

        sendBtn.disabled = false;
        contactForm.reset();

    }).catch(function(error){
        statusMessage.innerHTML = "✖ Failed to send message";
        statusMessage.className = "error";

        sendBtn.disabled = false;
    });
});

document.querySelectorAll('.skill-wrapper').forEach(wrapper => {
    const span = wrapper.querySelector('.progress-bar span');
    const width = span.getAttribute('data-width');
    
    wrapper.addEventListener('mouseenter', () => {
        span.style.width = width;
    });
    wrapper.addEventListener('mouseleave', () => {
        span.style.width = '0';
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
