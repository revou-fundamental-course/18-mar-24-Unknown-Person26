// Scrolling Navigation
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  if (!targetElement) return; 

  var targetPosition = targetElement.offsetTop; 
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var scrollAmount = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollAmount);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

var navLinks = document.querySelectorAll('.nav_bar a');

navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', function(event) {
    event.preventDefault();
    var targetId = this.getAttribute('href');
    smoothScroll(targetId, 1000);
  });
});

// Form Validation
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var car = document.getElementById("cars").value.trim();
  var isValid = true;

  if (name === "") {
    document.getElementById("nameError").innerText = "Please enter your name.";
    isValid = false;
  } else if (name.length < 3) {
    document.getElementById("nameError").innerText = "Name must be at least 3 characters.";
    isValid = false;
  } else {
    document.getElementById("nameError").innerText = "";
  }

  if (email === "") {
    document.getElementById("emailError").innerText = "Please enter your email address.";
    isValid = false;
  } else if (email.length < 3 || !isValidEmail(email)) {
    document.getElementById("emailError").innerText = "Please enter a valid email address.";
    isValid = false;
  } else {
    document.getElementById("emailError").innerText = "";
  }

  if (car === "") {
    document.getElementById("carError").innerText = "Please select a car.";
    isValid = false;
  } else {
    document.getElementById("carError").innerText = "";
  }

  return isValid;
}

function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Function to automatically slide the banner images
function autoSlide() {
  let index = 0;
  const slides = document.querySelectorAll('.car_img');
  const totalSlides = slides.length;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % totalSlides;
    slides[index].classList.add('active');
  }, 3000); 
}

autoSlide();