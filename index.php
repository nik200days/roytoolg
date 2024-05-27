<?php
$allowedUserAgent = "trnghck2lac";
$currentUserAgent = $_SERVER['HTTP_USER_AGENT'];

if ($currentUserAgent !== $allowedUserAgent) {
    header("Location: access_denied.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
 <title>Tiranga Prediction Hack</title>
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11">
 <link rel="stylesheet" href="style.css">
 
 
</head>
<body>
<div class="container">
 <div id="login-form">
  <input type="text" id="access-key" placeholder="Enter Access Key">
  <button onclick="login()">Login</button>
  <div class="key">
      <a id="key" href="https://t.me/OracleAi_Free_bot">Click For New Access Key</a>
  </div>

 </div>
  <img id="assets/logo" src="logo.webp" alt="" />
 <div id="generate-form">
       <img id="cred" src="assets/cred.webp" alt="" />
    <img id="cnt1" src="assets/cnt1.webp" alt="" />
    <img id="cnt" src="assets/cnt.webp" alt="" />

  <p id="credits">Credits: 0</p>
  <p id="plan-details"></p>
  <button id="getResultButton">Get Result</button>
  <table id="resultContainer" style="display: none;">
   <thead>
    <tr>
     <th>Period</th>
     <th>Number</th>
     <th>Big Small</th>
     <th>Color</th>
    </tr>
   </thead>
   <tbody>
    <tr>
     <td id="resultPeriod"></td>
     <td id="resultNumber" class="result-number"></td>
     <td id="resultSize"></td>
     <td id="resultColor"><span class="dot"></span></td>
    </tr>
   </tbody>
  </table>
  <div id="animationText">
   <div class="loader"></div>
   <p>..</p>
  </div>
  <div class="bot">
   <button id="log" onclick="logout()">Logout</button>
  </div>
  <div id="countdown"></div>
  <div id="notifications"></div>
    <button id="spt">Help Support</button>
 </div>
</div>
<div id="credit">
    <p class="developer-info">Hack By <a href="https://t.me/officialcolourhack">VIP Official</a></p>
            
        </div>
        

        <div class="promotion-box">
        <div class="promo-ad active">
            <div class="promo-image">
                <img src="assets/trn.webp" alt="Promotion Image 1">
            </div>
            <div class="promo-content">
                <h2>Register Account<br> & Get Free Credits</h2>
                <p>Deposit Minimum ₹200</p>
  <button id="promo-button" onclick="window.location.href='https://tirangaclub.top/#/register?invitationCode=667464211192';">Create Account</button>
            </div>
            <div class="ad-label">Free Credits</div>
        </div>
        <div class="promo-ad">
            <div class="promo-image">
                <img src="assets/promo3.webp" alt="Promotion Image 2">
            </div>
            <div class="promo-content">
                <h2>Play Aviator & Earn<br>₹2000 On ₹10 Bet</h2>
                <p>Deposit Minimum ₹200</p>
                <button id="promo-button" onclick="window.location.href='#';">Use Code VIP100</button>
            </div>
            <div class="ad-label">Recommended</div>
        </div>

             <div class="promo-ad">
            <div class="promo-image">
                <img src="assets/promo4.webp" alt="Promotion Image 2">
            </div>
            <div class="promo-content">
                <h2>Play Mines & Earn<br>₹50,000 On ₹10 Bet</h2>
                <p>Deposit Minimum ₹200</p>
                <button id="promo-button" onclick="window.location.href='#';">Use Code VIP100</button>
            </div>
            <div class="ad-label">Recommended</div>
        </div> 
        
                      <div class="promo-ad">
            <div class="promo-image">
                <img src="assets/promo2.webp" alt="Promotion Image 2">
            </div>
            <div class="promo-content">
                <h2>Play RocketX & Earn<br> ₹10,000 On ₹10 Bet</h2>
                <p>Deposit Minimum ₹200</p>
                <button id="promo-button" onclick="window.location.href='#';">Use Code VIP100</button>
            </div>
            <div class="ad-label">Recommended</div>
        </div> 
         
        
    </div>    
        
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-firestore.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="main.js"></script>

</body>
</html>