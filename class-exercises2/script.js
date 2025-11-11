// Exercise: AJAX Request Handler and Error Handler (Parts 9 & 10)

/*
|--------------------------------------------------------------------------
| Core Asynchronous Fetch Function
|--------------------------------------------------------------------------
| Handles fetching, parsing, success, and error handling for any given URL.
*/
async function fetchData(url) {
    const outputDiv = document.getElementById('output');
    
    // Loading indicator (Optional - if time)
    outputDiv.innerHTML = '<div class="loading-indicator">Loading data...</div>'; 

    try {
        // 1. Fetch data from the specified URL
        const response = await fetch(url);

        // 2. Check for HTTP errors (e.g., 404 Not Found) (Part 4: Error Handling)
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        // 3. Parse the JSON response (Part 3)
        const data = await response.json();
        
        // 4. Display the data (Success Case) (Part 3)
        console.log("JSON Data Loaded:", data);
        
        // Convert the object back to a nicely formatted JSON string for display
        const formattedJson = JSON.stringify(data, null, 4); 
        
        outputDiv.innerHTML = `
            <h3>Data Loaded Successfully (AJAX Success):</h3>
            <pre>${formattedJson}</pre>
        `;
        
    } catch (error) {
        // 5. Display appropriate error messages to the user (Part 4: Error Handling)
        console.error("AJAX Request Failed:", error);

        outputDiv.innerHTML = `
            <div style="color: red; border: 1px solid red; padding: 15px;">
                <h3>Error Loading Data</h3>
                <p><strong>URL Requested:</strong> ${url}</p>
                <p><strong>Details:</strong> ${error.message}</p>
                <p>Check the console (F12) for debugging.</p>
            </div>
        `;
    }
}

/*
|--------------------------------------------------------------------------
| Event Listeners and Setup
|--------------------------------------------------------------------------
*/
document.addEventListener('DOMContentLoaded', () => {
    // Get the button elements
    const loadDataBtn = document.getElementById('load-data-btn');
    const loadErrorBtn = document.getElementById('load-error-btn');
    
    // Success Case: Loads the existing JSON file when button is clicked
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', () => {
            fetchData('travel-data.json');
        });
    }

    // Error Case: Attempts to load a non-existent file when button is clicked
    if (loadErrorBtn) {
        loadErrorBtn.addEventListener('click', () => {
            fetchData('non-existent-file.json'); 
        });
    }
});