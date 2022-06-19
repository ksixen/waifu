import React, { useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index/index";
import SavedImages from "./pages/SavedImages/SavedImages";
import { Sidebar } from "./components";
import { NavList } from "./components/NavList/NavList";

function App() {
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

  axios.defaults.baseURL = "https://api.waifu.pics/";

  return (
    <>
      <header className="header-app">
        <div className="header-app--inner"><span className="header-text">vk</span></div>
      </header>
      <div className="root-wrapper">
        <Sidebar />
        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/saved" element={<SavedImages />} />
          </Routes>
        </div>
        <div className="right-sidebar sidebar">
          <div className="sidebar-wrapper">
            <NavList
              onClick={() => {}}
              list={[
                { title: "Mixed", isActive: true },
                { title: "SFW", isActive: false },
                { title: "NSFW", isActive: false },
              ]}
            />
            <NavList
              onClick={(e) => console.log(e)}
              list={[
                { title: "All", isActive: true },
                { title: "Neko", isActive: false },
                { title: "Shinoubi", isActive: false },
                { title: "bully", isActive: false },
                { title: "cuddle", isActive: false },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
