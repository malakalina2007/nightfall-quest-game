document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Hash the password using SHA-256
    let inputHashed = CryptoJS.SHA256(password).toString();

    console.log("Username:", username);
    console.log("Hashed Password:", inputHashed);

    let sqlQuery = `SELECT id, username, password, page FROM users WHERE username = '${username}'`;
    console.log("SQL Query:", sqlQuery);
    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        if (!response.ok) {
            console.error("Error: Unable to fetch data", response);
            return;
        }

        let result = await response.json();
        console.log("API Response:", result);

        if (result.success && result.data.length > 0) {
            let user = result.data[0];

            if (user.password === inputHashed) {
                sessionStorage.setItem("id", user.id);
                sessionStorage.setItem("username", user.username);

                let loginTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
                sessionStorage.setItem("loginTime", loginTime);

                console.log("Generated login time:", loginTime);

                let updateQuery = `UPDATE users SET login_time = '${loginTime}' WHERE id = '${user.id}'`;
                dbConfig.set('query', updateQuery);

                let updateResponse = await fetch(dbConnectorUrl, {
                    method: "POST",
                    body: dbConfig
                });

                if (updateResponse.ok) {
                    console.log("Login time updated successfully!");
                    
                    // Redirect based on last page
                    let redirectPage = 'start.html'; // default page
                    
                    switch(user.page) {
                        case 'Cave 1':
                            redirectPage = 'cave1/cave1.html';
                            break;
                        case 'Cave 2':
                            redirectPage = 'cave2/cave2.html';
                            break;
                        case 'Cave 3':
                            redirectPage = 'cave3/cave3.html';
                            break;
                        case 'Cave 4':
                            redirectPage = 'cave4/cave4.html';
                            break;
                        default:
                            redirectPage = 'start.html';
                    }
                    
                    window.location.href = redirectPage;
                    
                } else {
                    console.error("Failed to update login time.");
                    const updateResult = await updateResponse.json();
                    console.error("Update Response:", updateResult);
                }
            } else {
                document.getElementById("loginMessage").textContent = "Invalid password.";
            }
        } else {
            document.getElementById("loginMessage").textContent = "Invalid username.";
        }
    } catch (error) {
        console.error("Error in fetch:", error);
    }
});