
async function getTokenFromReboot(username, password) { // Fetches the JWT token from Reboot login endpoint

    try {
        let newToken = "";

        //Make a POST request to the signin endpoint, and supply your credentials using Basic authentication, with base64 encoding.
        let response = await fetch(`https://learn.reboot01.com/api/auth/signin`, {
            method: "POST",
            headers: {
                Authorization: `basic ${btoa(username + ":" + password)}`, // Encode a string in base64
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });


        newToken = await response.json(); // Wait for the full data to be loaded

        if (newToken.error) {
            console.error(newToken.error);
            return "error: " + newToken.error; // User does not exist or password incorrect
        }
        // console.log("UserToken = ", newToken)
        return newToken; // Return the token

    } catch (error) { // Catch any error
        console.error(error);
        return "error: " + error;
    }
}