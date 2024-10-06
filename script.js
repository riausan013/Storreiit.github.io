// Load existing data from Local Storage when the page is loaded
window.onload = function() {
    loadVideos();
    loadWebpages();
    loadKeywords();
};

// Function to add YouTube videos
function addVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = extractVideoId(url);
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        const videoList = document.getElementById('video-list');

        const videoDiv = document.createElement('div');
        videoDiv.id = `video-${videoId}`;
        videoDiv.innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                               <img src="${thumbnailUrl}" class="thumbnail" />
                              </a>
                              <button onclick="removeVideo('${videoId}')">Remove</button>`;
        videoList.appendChild(videoDiv);

        // Save video to Local Storage
        saveVideo(videoId);

        document.getElementById('video-url').value = ''; // Clear input after adding
    } else {
        alert('Invalid YouTube URL');
    }
}

// Extract YouTube video ID
function extractVideoId(url) {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return (match && match[1]) ? match[1] : null;
}

// Function to add random webpage links
function addWebpage() {
    const url = document.getElementById('webpage-url').value;
    if (isValidURL(url)) {
        const webpageList = document.getElementById('webpage-list');

        const webpageDiv = document.createElement('div');
        webpageDiv.id = `webpage-${url}`;
        webpageDiv.innerHTML = `<a href="${url}" target="_blank" class="webpage-thumbnail">
                                 ${url}
                               </a>
                               <button onclick="removeWebpage('${url}')">Remove</button>`;
        webpageList.appendChild(webpageDiv);

        // Save webpage to Local Storage
        saveWebpage(url);

        document.getElementById('webpage-url').value = ''; // Clear input after adding
    } else {
        alert('Invalid Webpage URL');
    }
}

// Validate if a string is a valid URL
function isValidURL(string) {
    const res = string.match(/(https?:\/\/[^\s]+)/g);
    return (res !== null);
}

// Function to add keywords/sentences with category colors
function addKeyword() {
    const keyword = document.getElementById('keyword-input').value;
    const category = document.getElementById('category').value;

    if (keyword.trim()) {
        const keywordList = document.getElementById('keyword-list');

        const keywordDiv = document.createElement('div');
        keywordDiv.classList.add('keyword-box', category);
        keywordDiv.innerHTML = `${keyword} <button onclick="removeKeyword('${keyword}')">Remove</button>`;
        keywordList.appendChild(keywordDiv);

        // Save keyword to Local Storage
        saveKeyword(keyword, category);

        document.getElementById('keyword-input').value = ''; // Clear input after adding
    } else {
        alert('Please enter a valid keyword or sentence');
    }
}

// Function to toggle between dark and light modes
function toggleMode() {
    const body = document.body;
    const isDarkMode = document.getElementById('mode-switch').checked;

    if (isDarkMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// Function to save video to Local Storage
function saveVideo(videoId) {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    if (!videos.includes(videoId)) {
        videos.push(videoId);
        localStorage.setItem('videos', JSON.stringify(videos));
    }
}

// Function to save webpage to Local Storage
function saveWebpage(url) {
    const webpages = JSON.parse(localStorage.getItem('webpages')) || [];
    if (!webpages.includes(url)) {
        webpages.push(url);
        localStorage.setItem('webpages', JSON.stringify(webpages));
    }
}

// Function to save keyword to Local Storage
function saveKeyword(keyword, category) {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];
    keywords.push({ keyword, category });
    localStorage.setItem('keywords', JSON.stringify(keywords));
}

// Function to load videos from Local Storage
function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const videoList = document.getElementById('video-list');
    videos.forEach(videoId => {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        const videoDiv = document.createElement('div');
        videoDiv.id = `video-${videoId}`;
        videoDiv.innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                               <img src="${thumbnailUrl}" class="thumbnail" />
                              </a>
                              <button onclick="removeVideo('${videoId}')">Remove</button>`;
        videoList.appendChild(videoDiv);
    });
}

// Function to load webpages from Local Storage
function loadWebpages() {
    const webpages = JSON.parse(localStorage.getItem('webpages')) || [];
    const webpageList = document.getElementById('webpage-list');
    webpages.forEach(url => {
        const webpageDiv = document.createElement('div');
        webpageDiv.id = `webpage-${url}`;
        webpageDiv.innerHTML = `<a href="${url}" target="_blank" class="webpage-thumbnail">
                                 ${url}
                               </a>
                               <button onclick="removeWebpage('${url}')">Remove</button>`;
        webpageList.appendChild(webpageDiv);
    });
}

// Function to load keywords from Local Storage
function loadKeywords() {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];
    const keywordList = document.getElementById('keyword-list');
    keywords.forEach(item => {
        const keywordDiv = document.createElement('div');
        keywordDiv.classList.add('keyword-box', item.category);
        keywordDiv.innerHTML = `${item.keyword} <button onclick="removeKeyword('${item.keyword}')">Remove</button>`;
        keywordList.appendChild(keywordDiv);
    });
}

// Function to remove a video from the list and Local Storage
function removeVideo(videoId) {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const updatedVideos = videos.filter(video => video !== videoId);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
    document.getElementById(`video-${videoId}`).remove();
}

// Function to remove a webpage from the list and Local Storage
function removeWebpage(url) {
    const webpages = JSON.parse(localStorage.getItem('webpages')) || [];
    const updatedWebpages = webpages.filter(web => web !== url);
    localStorage.setItem('webpages', JSON.stringify(updatedWebpages));
    document.getElementById(`webpage-${url}`).remove();
}

// Function to remove a keyword from the list and Local Storage
function removeKeyword(keyword) {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];
    const updatedKeywords = keywords.filter(item => item.keyword !== keyword);
    localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
    const keywordDivs = document.querySelectorAll('.keyword-box');
    keywordDivs.forEach(div => {
        if (div.textContent.trim() === keyword) {
            div.remove();
        }
    });
}
