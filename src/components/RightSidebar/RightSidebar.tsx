import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/redux";
import { changeCategory, clearMainPageList } from "src/redux/slice";
import { INavItem, NavList } from "../NavList/NavList";

import "./RightSidebar.scss";

export const RightSidebar = () => {
  const dispatch = useAppDispatch();

  const [main, setMain] = useState("");

  const [values, setValues] = useState<INavItem[]>([]);
  useEffect(() => {
    const categoriesList = {
      sfw: [
        { title: "all", isActive: true },
        { title: "waifu", isActive: false },
        { title: "neko", isActive: false },
        { title: "shinobu", isActive: false },
        { title: "megumin", isActive: false },
        { title: "bully", isActive: false },
        { title: "cuddle", isActive: false },
        { title: "cry", isActive: false },
        { title: "hug", isActive: false },
        { title: "awoo", isActive: false },
        { title: "kiss", isActive: false },
        { title: "lick", isActive: false },
        { title: "pat", isActive: false },
        { title: "smug", isActive: false },
        { title: "bonk", isActive: false },
        { title: "yeet", isActive: false },
        { title: "blush", isActive: false },
        { title: "smile", isActive: false },
        { title: "wave", isActive: false },
        { title: "highfive", isActive: false },
        { title: "handhold", isActive: false },
        { title: "nom", isActive: false },
        { title: "bite", isActive: false },
        { title: "glomp", isActive: false },
        { title: "slap", isActive: false },
        { title: "kill", isActive: false },
        { title: "kick", isActive: false },
        { title: "happy", isActive: false },
        { title: "wink", isActive: false },
        { title: "poke", isActive: false },
        { title: "dance", isActive: false },
        { title: "cringe", isActive: false },
      ],
      nsfw: [
        { title: "all", isActive: true },
        { title: "waifu", isActive: false },
        { title: "neko", isActive: false },
        { title: "trap", isActive: false },
        { title: "blowjob", isActive: false },
      ],
    };
    switch (main) {
      case "Mixed":
        return setValues([]);

      case "SFW":
        return setValues(categoriesList.sfw);

      case "NSFW":
        return setValues(categoriesList.nsfw);
    }
  }, [main]);

  const setCategory = useCallback(
    (e: INavItem) => {
      if (main && main !== "Mixed" && e.title !== "all") {
        console.log("WORKING");
        const copyArr = Array.from(values);
        const findActive = copyArr.findIndex((nav) => nav.isActive);
        const findEventNav = copyArr.findIndex((nav) => nav.title === e.title);
        if (findActive !== -1 && findEventNav !== -1) {
          copyArr[findActive].isActive = false;
          copyArr[findEventNav].isActive = true;
          setValues(copyArr);
          dispatch(changeCategory(`${main}/${e.title}`.toLocaleLowerCase()));
          dispatch(clearMainPageList());
        }
      }
    },
    [main, values]
  );

  return (
    <div className="right-sidebar sidebar">
      <div className="sidebar-wrapper">
        <NavList
          onClick={(e) => setMain(e.title)}
          list={[
            { title: "Mixed", isActive: main === "Mixed" },
            { title: "SFW", isActive: main === "SFW" },
            { title: "NSFW", isActive: main === "NSFW" },
          ]}
        />
        <div className="overflow-nav">
          {values.length > 0 && <NavList onClick={setCategory} list={values} />}
        </div>
      </div>
    </div>
  );
};
