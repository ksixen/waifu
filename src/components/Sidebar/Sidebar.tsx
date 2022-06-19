import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { INavItem, NavList } from "../NavList/NavList";

import "./Sidebar.scss";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState([
    { title: "Feed", isActive: true, value: "/" },
    { title: "Saved", isActive: false, value: "/saved" },
    { title: "Settings", isActive: false, value: "/settings" },
  ]);
  const navigateToPage = (e: INavItem) => {
    const copyArr = Array.from(nav);
    const findActive = copyArr.findIndex((nav) => nav.isActive);
    const findEventNav = copyArr.findIndex((nav) => nav.title === e.title);
    if (findActive !== -1 && findEventNav !== -1) {
      copyArr[findActive].isActive = false;
      copyArr[findEventNav].isActive = true;
      setNav(copyArr);
    }
  };
  const { pathname } = useLocation();
  useEffect(() => {
    const findActive = nav.find((nav) => nav.isActive);
    if (findActive) {
      if (pathname !== findActive.value) {
        navigate(findActive.value);
      }
    }
  }, [nav]);
  return (
    <div className="left-sidebar sidebar">
      <div className="sidebar-wrapper">
        <NavList onClick={navigateToPage} list={nav} />
      </div>
    </div>
  );
};
