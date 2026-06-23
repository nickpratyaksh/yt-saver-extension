export type Video = {
  itemDetails: {
    _id: string;
    url: string;
    dateAdded: string;
    isFavourite: boolean;
    status: "Watched" | "Unwatched";
  };
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};
