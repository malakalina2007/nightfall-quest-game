async function fetchInventory() {
    let userId = sessionStorage.getItem("id"); // Retrieve user ID from session storage
    
    if (!userId) {
        console.error("No user ID found in session.");
        return;
    }

    let sqlQuery = `
        INSERT IGNORE INTO inventory (user_id, options_id, iname, type, damage, heal, cave_id)
SELECT '${userId}', it.options_id, it.iname, it.type, it.damage, it.heal, it.cave_id
FROM items it 
WHERE it.cave_id = ${cave_id};

    `;

    console.log("SQL Query:", sqlQuery);

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        if (!response.ok) {
            console.error("Error: Unable to update inventory", response);
            return;
        }

        let result = await response.json();
        console.log("API Response:", result);

        if (result.success) {
            console.log("Inventory updated successfully!");
        } else {
            console.error("Failed to update inventory.");
            console.error("Update Response:", result);
        }
    } catch (error) {
        console.error("Error in fetch:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchInventory);
