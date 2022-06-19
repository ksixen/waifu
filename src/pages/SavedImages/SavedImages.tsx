import localforage from "localforage";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image } from "src/components";
import { SAVED_IMAGES } from "src/constants/localdb";
import { IImage } from "../index";

const SavedImages = () => {
  const [savedList, setSavedList] = useState<IImage[]>([]);
  useEffect(() => {
    if (savedList.length === 0) {
      localforage
        .getItem(SAVED_IMAGES)
        .then((res: any) => setSavedList(res ?? []));
    }
  }, []);

  const loadMoreSaved = () => {};

  const ScrollableContent = useMemo(() => {
    return (
      <InfiniteScroll
        dataLength={savedList.length}
        next={loadMoreSaved}
        hasMore={true}
        loader={
          <>
            <Image isLoading />
          </>
        }
      >
        {savedList.map((i: IImage) => (
          <Image key={i.url} data={i} setErrorSave={() => {}} />
        ))}
      </InfiniteScroll>
    );
  }, [savedList]);

  return (
    <div className="app">
      <div className="scrollDiv" id="scrollDiv">
        {ScrollableContent}
      </div>
    </div>
  );
};

export default SavedImages;
