const inputs = document.querySelectorAll('.contact__input')

inputs.forEach(ipt => {
    ipt.addEventListener("focus", () => {
        ipt.parentNode.classList.add("focus")
        ipt.parentNode.classList.add("not-empty")
    })
    ipt.addEventListener("blur", () => {
        if (ipt.value == "") {
            ipt.parentNode.classList.remove("not-empty")
        }

        ipt.parentNode.classList.remove("focus")
    })
})


// -------------------------color changing bg------------------------------------

const toggleBtn = document.querySelector(".theme-toggle")
const allElements = document.querySelectorAll("*")


toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")

allElements.forEach(el => {
    el.classList.add('transition')
    setTimeout(() =>{
        el.classList.remove("transition")
    }, 1000)
})
})

firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector("#contact");

// ... (previous code)

// Add submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input field values
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Save data to Firebase
  database.ref("messages").push({
    firstname,
    lastname,
    email,
    message,
  });
  alert("Your message is recorded. Our team will contact you soon");
});