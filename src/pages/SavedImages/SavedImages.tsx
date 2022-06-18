import localforage from "localforage";
import React, { useEffect } from "react";
import { useState } from "react";
import { Image } from "src/components";
import { SAVED_IMAGES } from "src/constants/localdb";
import { getState, saveState } from "src/hooks/saveStart";
import { IImage } from "../index";

const SavedImages = () => {
  useEffect(() => {
    if (getState("Saved")) {
      const { scrollY } = getState("Saved");
      window.scrollTo(0, scrollY);
    }
  }, []);
  useEffect(() => {
    const save = () => {
      saveState("Saved", { scrollY: window.pageYOffset });
    };
    save();
    document.addEventListener("scroll", save);
    return () => document.removeEventListener("scroll", save);
  }, []);
  const [savedList, setSavedList] = useState<IImage[]>([]);
  useEffect(() => {
    if (savedList.length === 0) {
      localforage
        .getItem(SAVED_IMAGES)
        .then((res: any) => setSavedList(res ?? []));
    }
  }, [savedList]);
  return (
    <div className="app-wrapper">
      {savedList.map((i: IImage) => (
        <Image key={i.url} data={i} setErrorSave={() => {}} />
      ))}
    </div>
  );
};

export default SavedImages;
