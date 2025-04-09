document.addEventListener("DOMContentLoaded", async function () {
    try {
        const userId = sessionStorage.getItem('id'); // Get user ID from sessionStorage
        const currentPage = "Cave 3"; // Fixed page value

        if (!userId) {
            console.error("No user ID found in session.");
            return;
        }

        console.log("User ID:", userId);
        console.log("Current Page:", currentPage);

        let sqlQuery = `
            UPDATE users SET page = '${currentPage}' WHERE id = ${userId}
        `;

        console.log("SQL Query:", sqlQuery);

        dbConfig.set('query', sqlQuery);

        let updateResponse = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        if (!updateResponse.ok) {
            console.error("Error: Unable to update tracking data", updateResponse);
            return;
        }

        let result = await updateResponse.json();
        console.log("Visit Tracking Response:", result);

        if (result.success) {
            console.log("User visit tracked successfully!");
        } else {
            console.error("Failed to update tracking data.");
            console.error("Update Response:", result);
        }

    } catch (error) {
        console.error("Error tracking user visit:", error);
    }
});