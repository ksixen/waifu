import classNames from "classnames";
import React from "react";

import "./NavList.scss";

interface INavItem {
  title: string;
  isActive: boolean;
}

export const NavList = ({
  list,
  onClick,
}: {
  list: INavItem[];
  onClick: (e: INavItem) => void;
}) => {
  return (
    <nav className="nav-list">
      {list.map((nav, index) => (
        <div
          key={index}
          className={classNames({
            "nav-list-item": true,
            "nav-list-item--active": nav.isActive,
          })}
        >
          <span onClick={() => !nav.isActive && onClick(nav)}>{nav.title}</span>
        </div>
      ))}
    </nav>
  );
};
