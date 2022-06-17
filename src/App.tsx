import React, { useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index/index";
import SavedImages from "./pages/SavedImages/SavedImages";

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
    <div className="app">
      <nav className="nav">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/saved">Saved Images</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/saved" element={<SavedImages />} />
      </Routes>
    </div>
  );
}

export default App;
