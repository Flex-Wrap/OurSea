let markerData = [];

// Load JSON data when the script initializes
async function loadMarkerData() {
    try {
        const response = await fetch('../resources/markers.json');
        if (!response.ok) throw new Error('Error fetching marker data');
        markerData = await response.json();
        console.log('Marker data loaded:', markerData);
    } catch (error) {
        console.error('Failed to load marker data:', error);
    }
}

// Display popup information for a clicked marker
function showMarkerInfo(regionId) {
    const markerInfo = markerData.find(marker => marker.id === regionId);
    if (markerInfo) {
        const overlay = document.createElement('div');
        overlay.classList.add('popup-overlay');
        overlay.addEventListener('click', closePopup); // Close popup when clicking outside

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <h2>${markerInfo.name}</h2>
            <p>${markerInfo.poem}</p>
            <button class="close-btn">Close</button>
        `;
        popup.querySelector('.close-btn').addEventListener('click', closePopup); // Close button

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Add animation class after adding to the DOM to trigger CSS animation
        requestAnimationFrame(() => popup.classList.add('show'));
    } else {
        alert('No information available for this region.');
    }
}

// Close popup function
function closePopup() {
    const overlay = document.querySelector('.popup-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Attach click events to markers
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', () => {
        showMarkerInfo(marker.id);
    });
});

// Load the marker data when the script runs
loadMarkerData();
