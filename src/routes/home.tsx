import SettingsSheet from "@/components/home/SettingsSheet";
import { VideoCard } from "@/components/home/VideoCard";
import {
  VideoSkeleton,
  VideosSkeleton,
} from "@/components/home/VideosSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, Video, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FiltersMenu } from "@/components/home/FiltersMenu.tsx";
import useVideosState from "@/lib/videosState";
import useFiltersState from "@/lib/filtersState";
import { sortVideos, searchVideos } from "@/lib/utils";
import useScrollState from "@/lib/scrollState";
export default function Home() {
  const { videosDetails, getVideosDetails, getVideos, videos, isLoading } =
    useVideosState();
  const {
    isSearching,
    searchQuery,
    toggleSearching,
    setSearchQuery,
    sortBy,
    orderBy,
    showFavourites,
  } = useFiltersState();
  const { scrollLocation, scrollItems, getScrollData, setScrollData } =
    useScrollState();

  const [currentlyVisible, setCurrentlyVisible] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  function onScroll(e: any) {
    const { scrollTop } = e.currentTarget;
    // console.log(scrollTop, scrollLeft);
    const newCurrentlyVisible = Math.trunc(scrollTop / 112);
    setCurrentlyVisible(newCurrentlyVisible);
    // console.log(newCurrentlyVisible);
    const visibleVideos = Array.from(
      { length: 8 },
      (_, i) => i + currentlyVisible,
    );
    const newScrollItems = videosDetails.filter((_, i) =>
      visibleVideos.includes(i),
    );
    // console.log(newScrollItems);
    setScrollData(scrollTop, newScrollItems);
  }

  const renderVideos = () => {
    let filteredVideos = [...videosDetails];
    if (searchQuery.length > 0 && isSearching) {
      filteredVideos = searchVideos({
        videos: videosDetails,
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
    // if (filteredVideos.length === 0)
    //   return <div className="text-center">No videos!</div>;
    if (orderBy == "descending") filteredVideos = filteredVideos.reverse();

    const visibleVideos = Array.from(
      { length: 3 },
      (_, i) => i + currentlyVisible,
    );

    // return filteredVideos.map((item) =>
    //   scrollItems.some((i) => i.itemDetails.url === item.itemDetails.url) ? (
    //     // scrollItems.map((i) => <VideoCard video={i} key={i.itemDetails.url} />)
    //     <VideoCard video={scrollItems[0]} key={"sdfsdf08s7df"} />
    //   ) : (
    //     <VideoCard video={item} key={item.itemDetails.url} />
    //   ),
    // );

    // return scrollItems.map((item) => (
    //   <VideoCard video={item} key={item.itemDetails.url} />
    // ));

    const reverseVideos = [...videos].reverse();

    return reverseVideos.map((item) => {
      const savedVideo = scrollItems.find(
        (i) => i.itemDetails.url === item.url,
      );
      if (savedVideo)
        return (
          <VideoCard video={savedVideo} key={savedVideo.itemDetails.url} />
        );
      else if (!isLoading) {
        const filteredVideo = videosDetails.find(
          (i) => i.itemDetails.url === item.url,
        );
        if (filteredVideo)
          return (
            <VideoCard
              video={filteredVideo}
              key={filteredVideo.itemDetails.url}
            />
          );
      } else return <VideoSkeleton />;
    });
  };

  useEffect(() => {
    getVideos();
    getScrollData();
  }, []);

  useEffect(() => {
    // videos variable updated? Yes, but actually no.
    setTimeout(() => {
      // videos variable updated? Yes.
      getVideosDetails();
    }, 10);
  }, [videos]);

  useEffect(() => {
    if (viewportRef.current && scrollLocation) {
      viewportRef.current.scrollTop = scrollLocation;
    }
  }, [scrollLocation]);

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
      <ScrollArea viewportRef={viewportRef} onScroll={onScroll}>
        <div className="flex flex-col gap-4">
          {/* {isLoading ? <VideosSkeleton /> : renderVideos()} */}
          {renderVideos()}
        </div>
      </ScrollArea>
    </div>
  );
}
