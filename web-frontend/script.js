console.log('Script loaded');

function submitLink() {
    const linkInput = document.getElementById('videoLink').value;
    const videoContainer = document.getElementById('videoContainer');
    const saveButton = document.getElementById('saveButton');
    const spinner = document.getElementById('spinner');

    // Show the spinner
    spinner.style.display = 'block';
    videoContainer.innerHTML = '';

    fetch(`http://localhost:3000/download?url=${encodeURIComponent(linkInput)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(videoBlob => {
            const videoUrl = URL.createObjectURL(videoBlob);
            videoContainer.innerHTML = `<video controls src="${videoUrl}" width="600"></video>`;
            saveButton.style.display = 'block'; // Show the save button
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            saveButton.style.display = 'none'; // Hide the save button if there's an error
        })
        .finally(() => {
            // Hide the spinner
            spinner.style.display = 'none';
        });
}

function downloadVideo() {
    const linkInput = document.getElementById('videoLink').value;

    fetch(`http://localhost:3000/download?url=${encodeURIComponent(linkInput)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(videoBlob => {
            const videoUrl = URL.createObjectURL(videoBlob);
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.getElementById('submitButton').addEventListener('click', submitLink);
document.getElementById('saveButton').addEventListener('click', downloadVideo);

// Initially hide the save button
document.getElementById('saveButton').style.display = 'none';