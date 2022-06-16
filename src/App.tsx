import axios from 'axios';
import localforage from "localforage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "./hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { SAVED_IMAGES } from "./constants/localdb";
import { ErrorMessage } from './components/ErrorMessage';
import { Loading } from "./components/Loading";

interface IImage {
  url: string;
  id: string;
}

function App() {
  const [image, setImage] = useState<IImage[]>([]);
  const [errorSave, setErrorSave] = useState<IImage | null>(null);
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
  const addToSaved = useCallback((image: IImage) => {
    localforage.getItem(SAVED_IMAGES).then((e: any) => {
      const prev = e ?? [];

      const findImage = prev.find((u: any) => u.url === image.url);
      if (findImage) {
        setErrorSave(image);
        return;
      }
      const newArr = [...prev, image];
      localforage.setItem(SAVED_IMAGES, newArr);
    });
  }, []);

  useEffect(() => {
    if (errorSave) {
      const clearError = setInterval(() => setErrorSave(null), 3000);
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
          <div className="infinity-scroll-center">
            <div className="image-block">
              <div className="image-wrapper">
                <Loading />
              </div>
            </div>
          </div>
        }
        pullDownToRefresh
        refreshFunction={refreshImages}
      >
        {image.map((data, index) => (
          <div className="image-block" key={index}>
            <div className="image-wrapper">
              <img className="image" src={data.url} alt={data.url} />
            </div>
            <button onClick={() => addToSaved(data)}>Add To Saved</button>
          </div>
        ))}
      </InfiniteScroll>
    );
  }, [image]);
  return (
    <div className="app">
      {errorSave && <ErrorMessage onClear={() => setErrorSave(null)} />}
      <header className="app-wrapper">
        {ScrollableContent}
      </header>
    </div>
  );
}

export default App;