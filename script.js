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
        // Create overlay and popup elements
        const overlay = document.createElement('div');
        overlay.classList.add('popup-overlay');
        overlay.addEventListener('click', closePopup); // Close popup on overlay click

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <h1 class="country-name">${markerInfo.id.toUpperCase()}</h1>
            <h2 class="sea-name">${markerInfo.sea_or_ocean}</h2>
            <div class="poem-container">
                <p class="poem-text">
                    <i>${markerInfo.poem.replace(/\n/g, '<br>')}</i>
                </p>
                <p class="poem-author">— ${markerInfo.author}</p>
            </div>
            <div class="image-carousel">
                ${markerInfo.images.map(image => `<img src="resources/${image}" alt="${markerInfo.id}" class="carousel-image">`).join('')}
            </div>
            <button class="close-btn">Close</button>
        `;

        popup.querySelector('.close-btn').addEventListener('click', closePopup);

        // Add popup to overlay and overlay to the DOM
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Trigger CSS animation
        requestAnimationFrame(() => popup.classList.add('show'));
    } else {
        alert('No information available for this region.');
    }
}

// Close popup function
function closePopup() {
    const overlay = document.querySelector('.popup-overlay');
    if (overlay) overlay.remove();
}

// Attach click events to markers
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', () => {
        showMarkerInfo(marker.id);
    });
});

// Load the marker data when the script runs
loadMarkerData();
