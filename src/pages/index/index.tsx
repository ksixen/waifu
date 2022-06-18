import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { ErrorMessage, Image } from "src/components";
import { addToMainPageList, clearMainPageList } from "src/redux/slice";
import { getState, saveState } from "src/hooks/saveStart";

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

  useEffect(() => {
    if (getState("Feed")) {
      const { scrollY } = getState("Feed");
      window.scrollTo(0, scrollY);
    }
  }, []);
  useEffect(() => {
    const save = () => {
      saveState("Feed", { scrollY: window.pageYOffset });
    };
    save();
    document.addEventListener("scroll", save);
    return () => document.removeEventListener("scroll", save);
  }, []);

  const getImages = useCallback(async () => {
    const req = await axios.get(currentCategory);
    const isExist = mainPageList.find((i) => i && i.url == req.data.url);
    if (!isExist) {
      return setImage({ url: req.data.url, date: Date.now() });
    } else {
      return setImage(undefined);
    }
  }, [mainPageList]);
  const refreshImages = useCallback(() => {
    dispatch(clearMainPageList());
  }, []);

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
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h4 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h4>
        }
        releaseToRefreshContent={
          <h4 style={{ textAlign: "center" }}>&#8593; Release to refresh</h4>
        }
        pullDownToRefresh
        refreshFunction={refreshImages}
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
      <header className="app-wrapper">
        <div className="scrollDiv" id="scrollDiv">
          {ScrollableContent}
        </div>
      </header>
    </div>
  );
};

export default IndexPage;
