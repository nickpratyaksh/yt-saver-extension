// Utility function to generate unique IDs (similar to nanoid)
function generateId(length = 21) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// Utility function to get videos from local storage
function getVideos(callback) {
  chrome.storage.local.get("videos", (res) => {
    const videos = res.videos ? JSON.parse(res.videos) : [];
    callback(videos);
  });
}

// Utility function to save videos back to local storage
function saveVideos(videos, callback) {
  chrome.storage.local.set({ videos: JSON.stringify(videos) }, callback);
}

// Utility function to get video details from the youtube api
async function getVideoDetails(videoUrl) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${videoUrl}&format=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load video:", item);
  }
}

// Function to handle saving a video
function handleSaveVideo(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      getVideos((videos) => {
        const exists = videos.some((video) => video.url === activeTab.url);
        if (!exists) {
          getVideoDetails(activeTab.url).then((videoDetails) => {
            videos.push({
              ...videoDetails,
              itemDetails: {
                _id: generateId(),
                url: activeTab.url,
                isFavourite: false,
                dateAdded: new Date(),
                status: "unwatched",
              },
            });
            saveVideos(videos, () => sendResponse({ status: "success" }));
          });
        } else {
          sendResponse({ status: "error", message: "Video already saved." });
        }
      });
    } else {
      sendResponse({ status: "error", message: "No active tab found." });
    }
  });
}

// Function to handle deleting a video
function handleDeleteVideo(message, sendResponse) {
  const videoId = message.videoId;
  getVideos((videos) => {
    const updatedVideos = videos.filter((video) => video._id !== videoId);
    saveVideos(updatedVideos, () => sendResponse({ status: "success" }));
  });
}

// Function to check if a video exists
function handleCheckVideo(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      getVideos((videos) => {
        const exists = videos.some(
          (video) => video.itemDetails.url === activeTab.url,
        );
        sendResponse({ exists });
      });
    } else {
      sendResponse({ exists: false });
    }
  });
}

// Listener for runtime messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save_video") {
    handleSaveVideo(sendResponse);
  } else if (message.action === "delete_video") {
    handleDeleteVideo(message, sendResponse);
  } else if (message.action === "check_video") {
    handleCheckVideo(sendResponse);
  }

  return true; // Indicates an asynchronous response
});
