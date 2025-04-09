// Function to load the menu into every page
function loadMenu() {
    // Create a container for the menu
    let menuContainer = document.createElement("div");

    // Fetch the menu.html content and insert it into the page
    fetch("../menu/menu.html")
        .then(response => response.text())
        .then(html => {
            menuContainer.innerHTML = html;
            document.body.appendChild(menuContainer);
			
			// Change  starts
			//Insert script contents. Note: Scripts in menu.html inserted using .innerHTML won't work.
			let scriptContainer = document.createElement("script");
            scriptContainer.src = "../js/menuscript.js";
			document.body.appendChild(scriptContainer);
			// Change ends
			
            // Ensure settings persist across all pages
            loadSavedSettings();
        })
        .catch(error => console.error("Error loading menu:", error));
		
}

// Function to load saved settings (volume & font size)
function loadSavedSettings() {
    let savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
        document.getElementById("volume-slider").value = savedVolume;
        document.getElementById("volume-value").textContent = savedVolume;
    }

    let savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize !== null) {
        document.getElementById("font-slider").value = savedFontSize;
        document.getElementById("font-size-value").textContent = savedFontSize;
        //document.getElementById("main-content").style.fontSize = savedFontSize + "px";
		document.getElementById("user-input-container").style.fontSize = savedFontSize + "px";
    }
}

// Run the function when the page loads
// Change  starts
//window.onload = loadMenu;
window.addEventListener("load",loadMenu,false) 
// Change ends