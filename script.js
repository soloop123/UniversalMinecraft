let authInstance;

// Load Google API
function loadClient() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'YOUR_API_KEY',
            clientId: 'YOUR_CLIENT_ID',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.file'
        }).then(() => {
            authInstance = gapi.auth2.getAuthInstance();
            updateSignInStatus(authInstance.isSignedIn.get());
            document.getElementById('signin-button').addEventListener('click', signIn);
            authInstance.isSignedIn.listen(updateSignInStatus);
        });
    });
}

// Sign In
function signIn() {
    authInstance.signIn();
}

// Update UI
function updateSignInStatus(isSignedIn) {
    const uploadSection = document.getElementById('upload-section');
    const status = document.getElementById('status');
    if (isSignedIn) {
        status.textContent = `Welcome, ${authInstance.currentUser.get().getBasicProfile().getName()}!`;
        uploadSection.classList.remove('hidden');
    } else {
        status.textContent = 'Please sign in to upload or download content.';
        uploadSection.classList.add('hidden');
    }
}

// Add File
document.getElementById('upload-button').addEventListener('click', () => {
    const title = document.getElementById('file-title').value;
    const description = document.getElementById('file-description').value;
    const link = document.getElementById('file-link').value;

    if (!title || !description || !link) {
        alert('Please fill out all fields.');
        return;
    }

    const fileList = document.getElementById('file-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${title}</strong><br>${description}<br><a href="${link}" target="_blank">Download</a>`;
    fileList.appendChild(listItem);

    alert('Content added successfully!');
});

// Load Google API
loadClient();
