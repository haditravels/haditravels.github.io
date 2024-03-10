// ---------------------------------------------Preload--------------------------------------------

// loading will end after document is loaded

// const preloader = document.querySelector("[data-preaload]");

// window.addEventListener("load", function () {
//   preloader.classList.add("loaded");
//   document.body.classList.add("loaded");
// });

// let navbar = document.querySelector(".header .navbar");

// document.querySelector("#menu-btn").onclick = () => {
//   navbar.classList.toggle("active");
// };

// --------------------------------------------------Sidebar------------------------------------------

function openNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "0";
  } else {
    console.error("sidepanel not found");
  }
}
function closeNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "-320px";
  }
}

// ---------------------------------------------------Hero slider------------------------------------------

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

// --------------------------------------------------Sidebar------------------------------------------

function rightCloseNav() {
  const rightSide = document.getElementById("right-side");
  if (rightSide) {
    rightSide.style.right = "-355px";
  }
}
function rightOpenNav() {
  const rightSide = document.getElementById("right-side");
  if (rightSide) {
    rightSide.style.right = "0";
  }
}

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
  const peopleno = document.querySelector("#peopleno").value;

  // Save data to Firebase
  database.ref("orders").push({
    place,
    date,
    contact,
    peopleno,
  });
  alert("Your request is recorded. Our team will contact you soon");
});
// Get a reference to the database
const database2 = firebase.database();

// Get the form element
const form2 = document.querySelector("#newsletter");

// Add submit event listener
form2.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input field value
  const email = document.querySelector("#email").value;

  // Save data to Firebase
  database2.ref("newsletter").push({
    email,
  });
  alert("You are successfully subscribed.");
});
