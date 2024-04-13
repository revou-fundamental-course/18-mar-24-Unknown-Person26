// Search Animation 
const searchButton = document.getElementById('search_button');
const searchBar = document.querySelector('.search_bar');

searchButton.addEventListener('click', function() {
  searchBar.classList.toggle('active'); // Toggle the 'active' class on search bar
});

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

// Menambahkan event listener pada setiap tautan di bagian middle section
var navLinks = document.querySelectorAll('.middle_section a');

navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', function(event) {
    event.preventDefault();
    var targetId = this.getAttribute('href');
    smoothScroll(targetId, 1000);
  });
});

// Menambahkan kelas aktif pada tautan yang sesuai dengan bagian yang sedang aktif
window.addEventListener('scroll', function() {
  var homeSection = document.getElementById('home');
  var collectionSection = document.getElementById('collection');
  var contactSection = document.getElementById('contact');
  var navLinks = document.querySelectorAll('.nav_link');

  if (isInViewport(homeSection)) {
    setActiveLink(navLinks, 0);
  } else if (isInViewport(collectionSection)) {
    setActiveLink(navLinks, 1);
  } else if (isInViewport(contactSection)) {
    setActiveLink(navLinks, 2);
  }
});

// Fungsi untuk menentukan apakah suatu elemen dalam viewport
function isInViewport(element) {
  var bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fungsi untuk menambahkan kelas aktif pada tautan yang sesuai
function setActiveLink(links, index) {
  links.forEach(function(link) {
    link.classList.remove('active');
  });
  links[index].classList.add('active');
}


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
  // Tampilkan pesan alert jika formulir valid
if (isValid) {
  openPopup(); // Panggil fungsi openPopup()
  resetForm(); // Memanggil fungsi untuk mengosongkan formulir
}
  return isValid;
}

function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// Fungsi untuk membuka pop-up
function openPopup() {
  document.getElementById("customPopup").style.display = "block";
}
// Function to reset the form
function resetForm() {
  document.getElementById("name").value = ""; // Kosongkan nilai input nama
  document.getElementById("email").value = ""; // Kosongkan nilai input email
  document.getElementById("cars").value = ""; // Kosongkan nilai input car
}
// Fungsi untuk menutup pop-up
function closePopup() {
  document.getElementById("customPopup").style.display = "none";
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