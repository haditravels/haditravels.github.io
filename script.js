// ---------------------------------------------Preload--------------------------------------------

// loading will end after document is loaded

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

//----------------------------------------------- Hero section slider------------------------------
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let sliderDom = document.querySelector(".slider");
let SliderDom = sliderDom.querySelector(".slider .list");
let thumbnailBorderDom = document.querySelector(".slider .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".slider .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".slider .list .item");
  let thumbnailItemsDom = document.querySelectorAll(".slider .thumbnail .item");

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    sliderDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    sliderDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    sliderDom.classList.remove("next");
    sliderDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}

// ------------------------------------------------about us video slider-------------------------------------
document
  .querySelectorAll(".about .video-container .controls .control-btn")
  .forEach((btn) => {
    btn.onclick = () => {
      let src = btn.getAttribute("data-src");
      document.querySelector(".about .video-container .video").src = src;
    };
  });

// --------------- Back to Top btn -------------------------

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

function scrollToTop() {
  const scrollToTopBtn = document.documentElement || document.body;
  scrollToTopBtn.scrollIntoView({
    behavior: "smooth",
  });
}

//form backend start

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector("#book-form");

// ... (previous code)

// Add submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input field values
  const place = document.querySelector("#place").value;
  const date = document.querySelector("#date").value;
  const contact = document.querySelector("#contact").value;
  const peopleNo = document.querySelector("#peopleno").value;

  // Save data to Firebase
  database.ref("orders").push({
    place,
    date,
    contact,
    peopleno,
  });
  alert("Your request is recorded. Our team will contact you soon");
  // Initialize Email.js with the Public Key
  emailjs.init("VTKZBdwbBaxvZytYk");

  // Prepare email template parameters
  const templateParams = {
    to_email: "teapack534@gmail.com",
    from_name: "The Coding Impact",
    subject: "New Order",
    message: `Place: ${place}\nDate: ${date}\nContact Number: ${contact}\nPeople no: ${peopleNo}`,
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = "service_ru36ova";
  const emailjsTemplateId = "template_mug39bn";

  // Send email using Email.js
  emailjs
    .send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log("Email sent successfully:", response);
      location.reload();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
});
