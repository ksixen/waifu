import axios from "axios";
import localforage from "localforage";
import React, { useCallback } from "react";
import { IImage } from "src/pages/index";
import { SAVED_IMAGES } from "../../constants/localdb";
import "./Image.css";

export const Image = ({
  data = { url: ""},
  isLoading,
  setErrorSave = () => {},
}: {
  data?: IImage;
  setErrorSave?: (e: boolean) => void;
  isLoading?: boolean;
}) => {
  const addToSaved = useCallback((image: IImage) => {
    localforage.getItem(SAVED_IMAGES).then((e: any) => {
      const prev = e ?? [];

      const findImage = prev.find((u: any) => u.url === image.url);
      if (findImage) {
        setErrorSave(true);
        return;
      }
      const newArr = [image, ...prev];
      localforage.setItem(SAVED_IMAGES, newArr);
    });
  }, []);

  return (
    <div className="image-block">
      <div className="image-wrapper">
        {isLoading ? (
          <div className="codicon codicon-loading" />
        ) : (
          <img className="image" src={data.url} alt={data.url} />
        )}
      </div>
      <div className="image-button bookmark" onClick={() => addToSaved(data)}>
        <div className="codicon codicon-bookmark" />
      </div>
      <div className="image-button download" >
        <div className="codicon codicon-cloud-download" />
      </div>
    </div>
  );
};
