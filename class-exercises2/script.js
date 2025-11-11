
/*
| Handles fetching, parsing, success, and error handling for any given URL.
*/
async function fetchData(url) {
    const outputDiv = document.getElementById('output');
    
    // Loading indicator 
    outputDiv.innerHTML = '<div class="loading-indicator">Loading data...</div>'; 

    try {
        //  Fetch data from the specified URL
        const response = await fetch(url);

        //  Check for HTTP errors 
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        //  Parse the JSON response 
        const data = await response.json();
        
        //  Display the data (Success Case) 
        console.log("JSON Data Loaded:", data);
        
        // Convert the object back to a nicely formatted JSON string for display
        const formattedJson = JSON.stringify(data, null, 4); 
        
        outputDiv.innerHTML = `
            <h3>Data Loaded Successfully (AJAX Success):</h3>
            <pre>${formattedJson}</pre>
        `;
        
    } catch (error) {
        // Display appropriate error messages to the user (Part 4: Error Handling)
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
    Event Listeners and Setup
*/
document.addEventListener('DOMContentLoaded', () => {
    // Get the button elements
    const loadDataBtn = document.getElementById('load-data-btn');
    const loadErrorBtn = document.getElementById('load-error-btn');
    
    // Success Case
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', () => {
            fetchData('travel-data.json');
        });
    }

    // Error Case
    if (loadErrorBtn) {
        loadErrorBtn.addEventListener('click', () => {
            fetchData('non-existent-file.json'); 
        });
    }
});
