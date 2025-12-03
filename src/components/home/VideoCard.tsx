import { VideoDetails } from "@/lib/types";
import { Button } from "../ui/button";
import { PlayCircle } from "lucide-react";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import FavouriteButton from "./FavouriteButton";

export const VideoCard = ({ video }: { video: VideoDetails }) => {
  const handlePlay = () => {
    window.open(video.itemDetails.url, "_blank");
  };

  if (!video.title)
    return (
      <div className="flex gap-4 h-24">
        <img
          src={
            "https://www.shutterstock.com/image-vector/75x75x-color-bar-169-video-260nw-742680436.jpg"
          }
          alt={"Error Thumbnail"}
          className="h-full object-cover rounded aspect-video"
        />
        <div className="flex flex-col justify-between">
          <div>
            <p
              className="text-sm font-medium line-clamp-2 cursor-pointer"
              title={"Video not found!"}
            >
              Video not found!
            </p>
            <p className="text-xs text-muted-foreground">Error!</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
              aria-label="Play video"
            >
              <PlayCircle className="h-4 w-4 mr-1 text-green-500" />
              Play
            </Button>
            <FavouriteButton video={video.itemDetails} />
            <DeleteAlertDialog videoId={video.itemDetails._id} />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex gap-4 h-24">
        <img
          src={video.thumbnail_url}
          alt={`Thumbnail for ${video.title}`}
          className="h-full object-cover rounded aspect-video"
        />
        <div className="flex flex-col justify-between">
          <div>
            <p
              className="text-sm font-medium line-clamp-2 cursor-pointer"
              title={video.title}
            >
              {video.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">{video.author_name}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
              aria-label="Play video"
            >
              <PlayCircle className="h-4 w-4 mr-1 text-green-500" />
              Play
            </Button>
            <FavouriteButton video={video.itemDetails} />
            <DeleteAlertDialog videoId={video.itemDetails._id} />
          </div>
        </div>
      </div>
    </>
  );
};
