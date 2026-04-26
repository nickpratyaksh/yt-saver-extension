import { create } from "zustand";
import { VideoDetails } from "./types";

type ScrollStore = {
  scrollLocation: number;
  scrollItems: VideoDetails[];
  getScrollData: () => Promise<void>;
  setScrollData: (
    scrollLocation: number,
    scrollItems: VideoDetails[],
  ) => Promise<void>;
};

const useScrollState = create<ScrollStore>()((set) => ({
  scrollLocation: 0,
  scrollItems: [],
  getScrollData: async () => {
    setTimeout(() => {}, 5000);
    chrome.storage.local.get(["scrollData"], (res) => {
      const scrollData = JSON.parse(res.scrollData || "{}");
      set({
        scrollLocation: scrollData.scrollLocation,
        scrollItems: scrollData.scrollItems,
      });
    });
  },
  setScrollData: async (scrollLocation, scrollItems) => {
    const scrollData = JSON.stringify({ scrollLocation, scrollItems });
    chrome.storage.local.set({ scrollData });
    // set({ scrollItems: JSON.parse(scrollItems || "[]") });
  },
}));

export default useScrollState;
