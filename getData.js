async function getDataFromReboot(token) {

    await fetch(`https://learn.reboot01.com/api/graphql-engine/v1/graphql`, { // Get the data from reboot API with Token
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // Supply the JWT using Bearer authentication.
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // GraphQL Query to get the values for this user
            query: `query {
                        user {
                            firstName
                            lastName
                            login
                            email
                            createdAt
                            auditRatio
                            attrs

                            audits(where:{auditedAt:{_is_null: false}}) {
                            auditedAt
                            grade
                            }


                            progresses(where: {isDone: { _eq:true}}) {
                                createdAt
                                path
                                results {
                                    id
                                    grade
                                }
                            }


                            progressesByPath {
                                createdAt
                                updatedAt
                                path
                                succeeded
                            }

                            xps {
                                amount
                                originEventId
                                event {
                                    createdAt
                                }
                                path
                            }
                        }
                    }`
        })
    }).then(response => {
        response.json().then(json => { // Transfer to JSON format
            //console.log(json); // Print the data output -----------------------------------

            if (json.errors && json.errors.length > 0) { // Return error (If any)
                console.error(json.errors);
                json.errors.forEach(error => {
                    console.error(error);
                    alert(error);
                });
            } else {
                // console.log(json.data)      // Print the data output -----------------------------------
                showUserData(json.data);    // Show the output for the user in the profile page
            }
        });
    }).catch(error => {
        console.error(error);
    });
}