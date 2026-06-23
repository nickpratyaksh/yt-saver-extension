import SettingsSheet from "@/components/home/SettingsSheet";
import { VideoCard } from "@/components/home/VideoCard";
import { VideosSkeleton } from "@/components/home/VideosSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { FiltersMenu } from "@/components/home/FiltersMenu.tsx";
import useVideosState from "@/lib/videosState";
import useFiltersState from "@/lib/filtersState";
import { sortVideos, searchVideos } from "@/lib/utils";
export default function Home() {
  const { getVideos, videos, isLoading } = useVideosState();
  const {
    isSearching,
    searchQuery,
    toggleSearching,
    setSearchQuery,
    sortBy,
    orderBy,
    showFavourites,
  } = useFiltersState();

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const renderVideos = () => {
    let filteredVideos = [...videos];
    if (searchQuery.length > 0 && isSearching) {
      filteredVideos = searchVideos({
        videos: videos,
        query: searchQuery,
      });
    }
    sortVideos({
      videos: filteredVideos,
      sortBy,
    });
    if (showFavourites)
      filteredVideos = filteredVideos.filter(
        (item) => item.itemDetails.isFavourite,
      );
    if (filteredVideos.length === 0)
      return <div className="text-center">No videos!</div>;
    if (orderBy == "descending") filteredVideos = filteredVideos.reverse();

    return filteredVideos.map((item) => (
      <VideoCard video={item} key={item.itemDetails.url} />
    ));
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="w-96 h-[32rem] flex flex-col p-4 gap-4 border rounded-md shadow-lg">
      <div className="flex flex-col items-center justify-between w-full gap-2">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex items-center gap-2 flex-1">
            <SettingsSheet />
            {isSearching ? (
              <div className="flex-1">
                <Input
                  autoFocus={true}
                  placeholder={`Search ${videos.length} videos`}
                  value={searchQuery}
                  onChange={handleSearchInput}
                />
              </div>
            ) : (
              <div className="text-2xl font-bold">Youtube Saver</div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleSearching();
            }}
          >
            {isSearching ? (
              <XIcon className="size-5" />
            ) : (
              <SearchIcon className="size-5" />
            )}
          </Button>
          <FiltersMenu />
        </div>
      </div>
      <div className="border-b" />
      <ScrollArea>
        <div className="flex flex-col gap-4">
          {isLoading ? <VideosSkeleton /> : renderVideos()}
        </div>
      </ScrollArea>
    </div>
  );
}
