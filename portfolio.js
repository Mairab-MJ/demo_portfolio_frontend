/* ================================
   1. TYPING EFFECT — "$ whoami" ke neeche text type ho kar aata hai
================================ */
const typedText = document.getElementById("typedText");
const words = ["Mairab Satti"];
let charIndex = 0;

function typeWriter() {
  if (charIndex < words[0].length) {
    typedText.textContent += words[0].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 70); // 70ms per character — speed yahan control karo
  }
}
typeWriter();

/* ================================
   1b. PHOTO TILT EFFECT
   Mouse jahan bhi ho, photo halka sa us taraf tilt karega — 3D feel deta hai.
   Concept: mouse ki position ko -15deg se +15deg ke angle mein convert karte hain.
================================ */
const photoWrap = document.getElementById("photoWrap");

if (photoWrap) {
  photoWrap.addEventListener("mousemove", (e) => {
    const rect = photoWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;        // mouse ki position box ke andar
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // upar/neeche tilt
    const rotateY = ((x - centerX) / centerX) * 10;  // left/right tilt

    photoWrap.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Mouse hatte hi photo seedha (original position) pe wapas aa jaye
  photoWrap.addEventListener("mouseleave", () => {
    photoWrap.style.transform = "rotateX(0) rotateY(0)";
  });
}

/* ================================
   2. MOBILE NAV TOGGLE
   Hamburger icon click karne pe menu open/close hota hai
================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Link click karne pe mobile menu automatically band ho jaye
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

/* ================================
   3. SCROLL REVEAL ANIMATION
   Intersection Observer = browser ko batata hai "ye element screen pe aaya ya nahi"
   Jab element visible ho -> 'active' class add karo -> CSS transition chal jayegi
================================ */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // ek baar reveal ho gaya, dobara check na kare
    }
  });
}, { threshold: 0.15 }); // element ka 15% screen pe aaye tabhi trigger ho

revealElements.forEach(el => observer.observe(el));

/* ================================
   4. CONTACT FORM — demo submit handler
   (Real backend ke bina bas confirmation dikhata hai)
================================ */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! (Connect this form to a backend or a service like Formspree to actually receive emails.)");
  contactForm.reset();
});