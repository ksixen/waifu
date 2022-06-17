import axios from 'axios';
import localforage from "localforage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "./hooks/redux";
import { ErrorMessage } from './components/ErrorMessage';
import "@vscode/codicons/dist/codicon.css"
import { Image } from './components/Image/Image';
export interface IImage {
  url: string;
}

function App() {
  const [image, setImage] = useState<IImage[]>([]);
  const [errorSave, setErrorSave] = useState<boolean>(false);
  const { currentCategory } = useAppSelector((store) => store.category);
  useEffect(() => {
    localforage.config({
      driver: [
        localforage.WEBSQL,
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
      ],
      name: "Waifu Pics",
    });
  }, []);


  useEffect(() => {
    if (errorSave) {
      const clearError = setInterval(() => setErrorSave(false), 3000);
      return () => clearInterval(clearError);
    }
  }, [errorSave]);
  axios.defaults.baseURL = "https://api.waifu.pics/";

  const getImages = useCallback(async () => {
    const req = await axios.get(currentCategory);
    setImage((prev: any) => [...prev, { url: req.data.url }]);
  }, []);
  const refreshImages = useCallback(async () => {
    setImage([]);
    loadMoreImage();
    loadMoreImage();
    loadMoreImage();
    loadMoreImage();
  }, []);

  const loadMoreImage = () => {
    getImages();
  };
  useEffect(() => {
    if (image.length < 4) {
      loadMoreImage();
    }
  }, [image]);

  const ScrollableContent = useMemo(() => {
    return (
      <InfiniteScroll
        dataLength={image.length}
        next={loadMoreImage}
        hasMore={true}
        loader={
          <>
          <Image isLoading />
          <Image isLoading />
          <Image isLoading />
          <Image isLoading />
          </>
        }
        scrollableTarget="#scrollDiv"
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h4 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h4>
        }
        releaseToRefreshContent={
          <h4 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h4>
        }
        pullDownToRefresh
        refreshFunction={refreshImages}
      >
        {image.map((data) => (
          <Image key={data.url} data={data} setErrorSave={setErrorSave} />
        ))}
      </InfiniteScroll>
    );
  }, [image]);
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
}

export default App;