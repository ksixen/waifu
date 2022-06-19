import React, { useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import { Route, Routes, useNavigate } from "react-router-dom";
import IndexPage from "./pages/index/index";
import SavedImages from "./pages/SavedImages/SavedImages";
import { Sidebar } from "./components";
import { RightSidebar } from "./components/RightSidebar/RightSidebar";

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
        <div className="header-app--inner"><span className="header-text">waifu</span></div>
      </header>
      <div className="root-wrapper">
        <Sidebar />
        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/saved" element={<SavedImages />} />
            <Route path="/settings" element={<>Hello WORL</>} />
          </Routes>
        </div>
       <RightSidebar />
      </div>
    </>
  );
}

export default App;
