import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Video } from "./types";
import Fuse from "fuse.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchVideos({
  videos,
  query,
}: {
  videos: Video[];
  query: string;
}) {
  if (query.trim() === "") return videos;

  const fuse = new Fuse(videos, {
    keys: ["title", "author_name"],
    threshold: 0.4,
  });
  const result = fuse.search(query).map((result) => result.item);
  return result;
}

export function sortVideos({
  videos,
  sortBy,
}: {
  videos: Video[];
  sortBy: string;
}) {
  if (sortBy === "name") {
    const result = videos.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";
      return titleA.localeCompare(titleB);
    });
    return result;
  }
  if (sortBy === "date") {
    const result = videos.sort(
      (a, b) =>
        new Date(b.itemDetails.dateAdded).getTime() -
        new Date(a.itemDetails.dateAdded).getTime(),
    );
    return result;
  }
  return [];
}
