// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-InaG_BczYqynRn9udZfVEa9OYIeX3Mg",
    authDomain: "shahzad-dee0d.firebaseapp.com",
    projectId: "shahzad-dee0d",
    storageBucket: "shahzad-dee0d.appspot.com",
    messagingSenderId: "725151088109",
    appId: "1:725151088109:web:b52ef3c7f54e92aa073be4",
    measurementId: "G-QQZLVQQ3SQ"
  };

  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // Use storage directly from firebase

// Your other code

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(email).set({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    });

    console.log('User registered and data saved to Firestore');

    // Save email in user's cache
    localStorage.setItem('email', email);
  } catch (error) {
    console.error('Error registering user:', error);
  }
});
  
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
  
    try {
      const userCredential = await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      console.log('User logged in:', userCredential.user.email);
  
      // Save email in user's cache
      localStorage.setItem('email', userCredential.user.email);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
 

  function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var details = document.getElementById('details').value;
    var price = document.getElementById('price').value;
    var area = document.getElementById('area').value;
  
    // Retrieve user email from cache (assuming it's stored there)
    var userEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage
  
    var storageRef = firebase.storage().ref('images/' + file.name);
    var uploadTask = storageRef.put(file);
  
    uploadTask.on('state_changed', 
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
      }, 
      function(error) {
        // Handle unsuccessful uploads
        console.error('Error uploading image: ', error);
        alert('Error uploading image: ' + error.message);
      }, 
      function() {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          // Now, save the additional data to Firestore along with the image URL and user email
          firebase.firestore().collection('users').doc(userEmail).collection('images').add({
            imageUrl: downloadURL,
            details: details,
            price: price,
            area: area
          })
          .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
            alert('Image and data submitted successfully!');
            fileInput.value = ''; // Clear input field
            document.getElementById('details').value = '';
            document.getElementById('price').value = '';
            document.getElementById('area').value = '';
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
            alert('Error adding document: ' + error.message);
          });
        });
      }
    );
  }
   
 // Implement Google login
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;

    // Save user details in Firestore
    await firestore.collection('users').doc(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });

    // Save email in cache
    localStorage.setItem('email', user.email);
  } catch (error) {
    // Handle error
  }
};
