let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};
<<<<<<< HEAD

// video slider
document
  .querySelectorAll(".about .video-container .controls .control-btn")
  .forEach((btn) => {
    btn.onclick = () => {
      let src = btn.getAttribute("data-src");
      document.querySelector(".about .video-container .video").src = src;
    };
  });
=======
//form backend start
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBORetEdl7Ed7aX0Z03ZiQ2rrzCEvrn-go",
  authDomain: "haditravels-ef4b0.firebaseapp.com",
  databaseURL: "https://haditravels-ef4b0-default-rtdb.firebaseio.com",
  projectId: "haditravels-ef4b0",
  storageBucket: "haditravels-ef4b0.appspot.com",
  messagingSenderId: "212772020766",
  appId: "1:212772020766:web:79b0ab9de3b7ae9ad8440f",
  measurementId: "G-9ECQV4PQSX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector('#book-form');

// ... (previous code)

// Add submit event listener
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input field values
  const place = document.querySelector('#place').value;
  const date = document.querySelector('#date').value;
  const contact = document.querySelector('#contact').value;
  const peopleNo = document.querySelector('#peopleno').value;

  // Save data to Firebase
  database.ref('orders').push({
    place,
    date,
    contact,
    peopleNo
  });
  alert('Your request is recorded. Our team will contact you soon');
  // Initialize Email.js with the Public Key
  emailjs.init("VTKZBdwbBaxvZytYk");

  // Prepare email template parameters
  const templateParams = {
    to_email: 'teapack534@gmail.com',
    from_name: 'The Coding Impact',
    subject: 'New Order',
    message: `Place: ${place}\nDate: ${date}\nContact Number: ${contact}\nPeople no: ${peopleNo}`
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = 'service_ru36ova';
  const emailjsTemplateId = 'template_mug39bn';

  // Send email using Email.js
  emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
        location.reload();

    })
    .catch((error) => {
      console.error('Error sending email:', error);
  
    });
});
>>>>>>> 4b291677f4525d9a638fe920fa78f6140b809980
