import React from "react";
import { NavList } from "../NavList/NavList";

import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <div className="left-sidebar sidebar">
      <div className="sidebar-wrapper">
        <NavList
          onClick={() => {}}
          list={[{ title: "Feed", isActive: true }]}
        />
        <NavList
          onClick={(e) => console.log(e)}
          list={[
            { title: "Saved", isActive: false },
            { title: "Settings", isActive: false },
          ]}
        />
      </div>
    </div>
  );
};
