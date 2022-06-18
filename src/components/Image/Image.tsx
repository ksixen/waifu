import axios from "axios";
import { saveAs } from "file-saver";
import localforage from "localforage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IImage } from "src/pages/index";
import { SAVED_IMAGES } from "../../constants/localdb";
import "./Image.css";

export const Image = ({
  data = { url: "" },
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

  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="image-block">
      <div className="image-wrapper">
        {isLoading ? (
          <div className="codicon codicon-loading" />
        ) : (
          <>
            <img
              className="image"
              style={{ display: imageLoading ? "none" : "block" }}
              onLoad={() => setImageLoading(false)}
              src={data.url}
              alt={data.url}
            />
            <div
              className="codicon codicon-loading"
              style={{ display: imageLoading ? "block" : "none" }}
            />
          </>
        )}
      </div>
      <div className="image-button bookmark" onClick={() => addToSaved(data)}>
        <div className="codicon codicon-bookmark" />
      </div>
      <div className="image-button download" onClick={() => saveAs(data.url)}>
        <div className="codicon codicon-cloud-download" />
      </div>
    </div>
  );
};
