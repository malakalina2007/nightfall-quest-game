const dbConnectorUrl = "https://ashaju01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

//Update this with YOUR database credentials. 
let dbConfig = new URLSearchParams({
    hostname: 'localhost',
    username: 'ashaju01',
    password: 'f9Qx9XBPSnqZWBGN',
    database: 'CSC1034_CW_14',
});
// Useful debug function to print all Session Storage items
function printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

// Check if a user is logged in, if not, redirect to login page
function checkLogin() {
    console.log("Checking login status...");

    let userId = sessionStorage.getItem("id");
    if (!userId) {
        console.log("User not logged in. Redirecting to login page...");
        window.location.replace("../login.html"); // Ensure correct path
    } else {
        console.log("User is logged in with ID:", userId);
    }
}

// Run checkLogin() only after the DOM has loaded
document.addEventListener("DOMContentLoaded", checkLogin);
