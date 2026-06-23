import { create } from "zustand";

import { Video } from "./types";

// type FilterType = "all" | "favorites";

type VideosStore = {
  isLoading: boolean;
  videos: Video[];
  getVideos: () => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
  updateVideo: (updatedVideo: Video) => Promise<void>;
  setVideos: (videos: string) => Promise<void>;
};

const useVideosState = create<VideosStore>()((set, get) => ({
  isLoading: true,
  videos: [],
  videosDetails: [],
  getVideos: async () => {
    chrome.storage.local.get(["videos"], (res) => {
      const videos = JSON.parse(res.videos || "[]");
      set({ videos, isLoading: false });
    });
  },
  deleteVideo: async (videoId) => {
    const { videos } = get();
    const newVideos = videos.filter(
      (video) => video.itemDetails._id !== videoId,
    );
    set({
      videos: newVideos,
    });
    chrome.storage.local.set({ videos: JSON.stringify(newVideos) });
  },
  updateVideo: async (updatedVideo) => {
    const { videos } = get();
    const newVideos = videos.map((item) =>
      item.itemDetails._id === updatedVideo.itemDetails._id
        ? updatedVideo
        : item,
    );
    set({ videos: newVideos });
    chrome.storage.local.set({ videos: JSON.stringify(newVideos) });
  },
  setVideos: async (videos) => {
    chrome.storage.local.set({ videos });
    set({ videos: JSON.parse(videos || "[]") });
  },
}));

export default useVideosState;
