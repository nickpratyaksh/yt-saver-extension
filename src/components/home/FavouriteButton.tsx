import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Video } from "@/lib/types";
import useVideosState from "@/lib/videosState";
import { useState } from "react";

export default function FavouriteButton({ video }: { video: Video }) {
  const [isFavourite, setIsFavourite] = useState(video.itemDetails.isFavourite);
  const { updateVideo } = useVideosState();
  const handleFavorite = () => {
    setIsFavourite(!isFavourite);
    updateVideo({
      ...video,
      itemDetails: {
        ...video.itemDetails,
        isFavourite: !video.itemDetails.isFavourite,
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleFavorite}
        aria-label="Favorite video"
        title="Add to favorites"
      >
        <Star
          className={cn("h-4 w-4 ", {
            "text-yellow-400 fill-yellow-400": isFavourite,
          })}
        />
      </Button>
    </>
  );
}
