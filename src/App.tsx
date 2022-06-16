import axios from 'axios';
import localforage from "localforage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "./hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { SAVED_IMAGES } from "./constants/localdb";
import { ErrorMessage } from './components/ErrorMessage';
import { Loading } from "./components/Loading";
import "@vscode/codicons/dist/codicon.css"
import { Image } from './components/Image/Image';
export interface IImage {
  url: string;
  id: string;
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

  const getImages = useCallback(async (setState: any) => {
    const req = await axios.get(currentCategory);
    setState((prev: any) => [...prev, { url: req.data.url, id: uuidv4() }]);
  }, []);
  const refreshImages = useCallback(async () => {
    const req = await axios.get(currentCategory);
    setImage([{ url: req.data.url, id: req.data.url }]);
  }, []);
  const loadMoreImage = () => {
    getImages(setImage);
  };
  useEffect(() => {
    if (image.length === 0) {
      getImages(setImage);
    }
  }, [image]);

  const ScrollableContent = useMemo(() => {
    return (
      <InfiniteScroll
        dataLength={image.length}
        next={loadMoreImage}
        hasMore={true}
        loader={
          <Image isLoading />
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
        {ScrollableContent}
      </header>
    </div>
  );
}

export default App;