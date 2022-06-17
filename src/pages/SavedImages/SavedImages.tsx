import localforage from "localforage";
import React, { useEffect } from "react";
import { useState } from "react";
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
  }, [savedList]);
  return (
    <div>
      {savedList.map((i: IImage) => (
        <Image key={i.url} data={i} setErrorSave={() => {}} />
      ))}
    </div>
  );
};

export default SavedImages;
