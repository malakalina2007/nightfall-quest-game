        // Open settings modal
        function toggleSettings() {
            document.querySelector(".settings-modal").style.display = "block";
            document.querySelector(".overlay").style.display = "block";
        }

        // Close settings modal
        function closeSettings() {
            document.querySelector(".settings-modal").style.display = "none";
            document.querySelector(".overlay").style.display = "none";
        }

        // Update volume and store in localStorage
        function updateVolume(value) {
            document.getElementById("volume-value").textContent = value;
            localStorage.setItem("volume", value);
        }

        // Update font size using slider
        function updateFontSize(value) {
            document.getElementById("font-size-value").textContent = value;
           // document.getElementById("main-content").style.fontSize = value + "px";
		    document.getElementById("user-input-container").style.fontSize = value + "px";
            localStorage.setItem("fontSize", value);
        }

        // Toggle Pause/Continue button
        function togglePause() {
            let button = document.getElementById("pause-button");
            button.innerHTML = button.innerHTML === "⏸️" ? "▶️" : "⏸️";
        }

        // Load saved settings on page load
        window.onload = function () {
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
				document.getElementById("user-input-container").style.fontSize = value + "px";
            }
        };