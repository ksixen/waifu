import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { ErrorMessage, Image } from "src/components";
import { addToMainPageList, clearMainPageList } from "src/redux/slice";

export interface IImage {
  url: string;
  date?: number;
}

const IndexPage = () => {
  const [errorSave, setErrorSave] = useState<boolean>(false);
  const { currentCategory } = useAppSelector((store) => store.category);
  const { mainPageList } = useAppSelector((store) => store.imagesList);
  useEffect(() => {
    if (errorSave) {
      const clearError = setInterval(() => setErrorSave(false), 3000);
      return () => clearInterval(clearError);
    }
  }, [errorSave]);

  const dispatch = useAppDispatch();
  const setImage = (data: IImage | undefined) => {
    return dispatch(addToMainPageList(data));
  };

  const getImages = useCallback(async () => {
    const req = await axios.get(currentCategory);
    const isExist = mainPageList.find((i) => i && i.url == req.data.url);
    if (!isExist) {
      return setImage({ url: req.data.url, date: Date.now() });
    } else {
      return setImage(undefined);
    }
  }, [mainPageList]);

  const loadMoreImage = () => {
    getImages();
  };
  useEffect(() => {
    if (mainPageList.length < 4) {
      getImages();
    }
  }, [mainPageList]);

  const ScrollableContent = useMemo(() => {
    return (
      <InfiniteScroll
        dataLength={mainPageList.length < 4 ? 0 : mainPageList.length}
        next={loadMoreImage}
        hasMore={true}
        loader={
          <>
            <Image isLoading />
          </>
        }
        scrollableTarget="#scrollDiv"
      >
        {mainPageList.map(
          (data) =>
            data &&
            data.url && (
              <Image key={data.url} data={data} setErrorSave={setErrorSave} />
            )
        )}
      </InfiniteScroll>
    );
  }, [mainPageList]);

  return (
    <div className="app">
      {errorSave && <ErrorMessage onClear={() => setErrorSave(false)} />}
        <div className="scrollDiv" id="scrollDiv">
          {ScrollableContent}
        </div>
    </div>
  );
};

export default IndexPage;
