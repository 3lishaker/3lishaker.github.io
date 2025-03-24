document.addEventListener('DOMContentLoaded', function () { // Wait for full page to be loaded

    document.querySelector('.button').addEventListener('click', event => { // Add a Listener for the form login button
        event.preventDefault(); // Prevent the form from being submitted in the default way

        var username = document.getElementById('email').value;
        var password = document.getElementById('password').value;


        try {

            getTokenFromReboot(username, password).then(newToken => { // Get Token from Reboot for this user
                if (newToken != "" && !newToken.startsWith("error:")) {
                    token = newToken;
                    getDataFromReboot(token); // Get Data using the above Token
                } else {
                    alert(newToken);
                }
            });

        } catch (error) {
            console.log(error);
        }
        return false;
    });
});


function logOut() {

    contentDiv.innerHTML = ""; //Clear user details
    contentDiv.style.display = 'none'; // Hide user info div
    document.querySelector('.container').style.display = 'block'; // Show login form (container)
    document.querySelector('.signout-button').style.display = 'none'; // Hide SIGN OUT button

    // Clear the values
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    console.log("LOG OUT...")
}

// When user refresh the page
window.onload = function () {

    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
};
