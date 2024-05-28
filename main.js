// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5s_ZrdRnPply5mYH4M4zA52lGV-iLbpk",
  authDomain: "hckapk-8810b.firebaseapp.com",
  databaseURL: "https://hckapk-8810b-default-rtdb.firebaseio.com",
  projectId: "hckapk-8810b",
  storageBucket: "hckapk-8810b.appspot.com",
  messagingSenderId: "827150673565",
  appId: "1:827150673565:web:f9f818a4d1dad91b585674",
  measurementId: "G-ZFZ0BH0PE4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const loginForm = document.getElementById('login-form');
const generateForm = document.getElementById('generate-form');
const getResultButton = document.getElementById('getResultButton');
const creditsDisplay = document.getElementById('credits');
const planDetailsDisplay = document.getElementById('plan-details');

let lastResultTime = null;
let currentKeyDoc = null;

// Function to show success notification
function showSuccessNotification(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        showConfirmButton: false,
        timer: 2000
    });
}

// Function to show error notification
function showErrorNotification(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        showConfirmButton: false,
        timer: 2000
    });
}

function login() {
  const accessKey = document.getElementById('access-key').value.trim();
  const uid = document.getElementById('uid').value.trim();
  const deviceUUID = localStorage.getItem('deviceUUID') || uuid.v4();

  if (!/^\d+$/.test(uid)) {
    showErrorNotification('UID must be a number.');
    return;
  }

  db.collection('access_keys').doc(accessKey).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      const currentTime = new Date();
      const expiryDate = new Date(data.expiry);

      if (currentTime > expiryDate) {
        showErrorNotification('Access key has expired.');
        return;
      }

      if (data.deviceUUID && data.deviceUUID !== deviceUUID) {
        showErrorNotification('This access key is already in use on another device.');
        return;
      }

      if (!data.deviceUUID) {
        db.collection('access_keys').doc(accessKey).update({
          deviceUUID: deviceUUID
        }).then(() => {
          localStorage.setItem('deviceUUID', deviceUUID);
        });
      }

      currentKeyDoc = doc;
      creditsDisplay.innerText = `Credits: ${data.credits}`;
      planDetailsDisplay.innerText = `Exp on ${new Date(data.expiry).toLocaleDateString()}`;
      localStorage.setItem('accessKey', accessKey);
      localStorage.setItem('uid', uid);
      loginForm.style.display = 'none';
      generateForm.style.display = 'block';
      showSuccessNotification('Connected successfully');
    } else {
      showErrorNotification('Invalid access key.');
    }
  }).catch(error => {
    console.error("Error logging in:", error);
  });
}

function logout() {
  loginForm.style.display = 'block';
  generateForm.style.display = 'none';
  localStorage.removeItem('accessKey');
  localStorage.removeItem('uid');
  currentKeyDoc = null;
}

function checkLoginStatus() {
  const savedKey = localStorage.getItem('accessKey');
  const deviceUUID = localStorage.getItem('deviceUUID') || uuid.v4();

  if (savedKey) {
    db.collection('access_keys').doc(savedKey).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const currentTime = new Date();
        const expiryDate = new Date(data.expiry);

        if (currentTime > expiryDate) {
          showErrorNotification('Access key has expired.');
          logout();
          return;
        }

        if (data.deviceUUID && data.deviceUUID !== deviceUUID) {
          showErrorNotification('This access key is already in use on another device.');
          logout();
          return;
        }

        currentKeyDoc = doc;
        creditsDisplay.innerText = `Credits: ${data.credits}`;
        planDetailsDisplay.innerText = `Exp ${new Date(data.expiry).toLocaleDateString()}`;
        loginForm.style.display = 'none';
        generateForm.style.display = 'block';
      } else {
        showErrorNotification('Invalid access key.');
        logout();
      }
    }).catch(error => {
      console.error("Error checking login status:", error);
      logout();
    });
  }
}

window.onload = checkLoginStatus;

getResultButton.addEventListener('click', () => {
  const currentTime = new Date();
  const currentKeyData = currentKeyDoc.data();

  // Check if there are enough credits
  if (currentKeyData.credits <= 0) {
    showErrorNotification("Your credits for today have ended.");
    return;
  }

  if (lastResultTime && lastResultTime.getMinutes() === currentTime.getMinutes()) {
    showErrorNotification("Wait until complete this period");
    return;
  }

  document.getElementById("animationText").style.display = "block";
  document.getElementById("animationText").getElementsByTagName('p')[0].innerText = "Fetching result...";
  document.getElementById("resultContainer").style.display = "none";

  setTimeout(function() {
    const result = generateResult();
    document.getElementById("resultPeriod").innerText = formatPeriod(currentTime);
    document.getElementById("resultNumber").innerText = result.number;
    document.getElementById("resultNumber").className = `result-number color-${result.color.toLowerCase()}`;
    document.getElementById("resultColor").className = `color-${result.color.toLowerCase()}`;
    document.querySelector("#resultColor .dot").className = `dot color-${result.color.toLowerCase()}`;
    document.getElementById("resultSize").innerText = result.size;
    document.getElementById("resultContainer").style.display = "table";
    document.getElementById("animationText").style.display = "none";
    getResultButton.style.display = "block";
    lastResultTime = new Date();

    // Decrement credits and update Firebase
    const newCredits = currentKeyData.credits - 1;

    if (newCredits >= 0) {
      db.collection('access_keys').doc(currentKeyDoc.id).update({
        credits: newCredits
      }).then(() => {
        // Fetch the updated document to reflect the new state
        db.collection('access_keys').doc(currentKeyDoc.id).get().then(doc => {
          currentKeyDoc = doc;
          creditsDisplay.innerText = `Credits: ${newCredits}`;
        });
      }).catch(error => {
        console.error("Error updating credits:", error);
      });
    } else {
      showErrorNotification("Your credits for today have ended.");
    }
  }, 731);
});

function generateResult() {
  const number = Math.floor(Math.random() * 10);
  const mapping = [
    { size: "Small", color: "Orange" },
    { size: "Small", color: "Green" },
    { size: "Small", color: "Orange" },
    { size: "Small", color: "Green" },
    { size: "Small", color: "Orange" },
    { size: "Big", color: "Green" },
    { size: "Big", color: "Orange" },
    { size: "Big", color: "Green" },
    { size: "Big", color: "Orange" },
    { size: "Big", color: "Green" }
  ];
  return { number: number, ...mapping[number] };
}

function formatPeriod(date) {
  const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
  const minutesOfDay = date.getHours() * 60 + 10001 + date.getMinutes();
  return `${dateString}0${minutesOfDay}`;
}


// Countdown timer
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  const currentTime = new Date();
  const nextMinute = new Date(currentTime);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);
  nextMinute.setSeconds(0);

  const remainingSeconds = Math.floor((nextMinute - currentTime) / 1000);
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  countdownElement.textContent = `00:${seconds}`;

  if (remainingSeconds <= 0) {
    clearInterval(countdownInterval);
    countdownElement.textContent = "Next result is available now!";
  }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


function generateWinningNotification() {
    const startingDigits = ['7', '8', '9'];
    const firstDigit = startingDigits[Math.floor(Math.random() * startingDigits.length)];
    const secondDigit = Math.floor(Math.random() * 10);
    const phoneNumber = `+91 ${firstDigit}${secondDigit}XXXXXX${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    const winnings = [1764, 2205, 2646, 3087, 3920, 4900, 6172, 7938, 9800]; // Winning amounts in multiples of 2 and 8
    const winningAmount = winnings[Math.floor(Math.random() * winnings.length)];
  const formattedAmount = winningAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `User <span class="user">${phoneNumber} won <span class="winning-amount">₹${formattedAmount}</span>`;
}

  function displayNotification(content) {
    const notifications = document.getElementById('notifications');
    let notification = document.getElementById('single-notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      notification.id = 'single-notification';
      notifications.appendChild(notification);
    }

    notification.innerHTML = `
    <img id="mny" src="mny (1).gif" alt=""></img>
    <p>${content}</p>
  `;

    // Show the notification box
    notifications.style.display = 'block';
  }

  function updateNotifications() {
    // Generate and display a new notification every 2 seconds
    setInterval(() => {
      displayNotification(generateWinningNotification());
    }, 2000);
  }

  document.addEventListener('DOMContentLoaded', updateNotifications);
  
      // advertisement
  
  let currentAdIndex = 0;
        const ads = document.querySelectorAll('.promo-ad');
        const adInterval = 4700;

        function showNextAd() {
            ads[currentAdIndex].classList.remove('active');
            currentAdIndex = (currentAdIndex + 1) % ads.length;
            ads[currentAdIndex].classList.add('active');
        }

        setInterval(showNextAd, adInterval);
