import classNames from "classnames";
import React, { useEffect, useState } from "react";

import "./NavList.scss";

export interface INavItem {
  title: string;
  isActive: boolean;
  value?: string
}

export const NavList = ({
  list,
  onClick,
}: {
  list: INavItem[];
  onClick: (e: INavItem) => void;
}) => {
  const [_list, setList] = useState<INavItem[]>([]);
  useEffect(() => {
    if(list){
      setList(list)
    }
  },[list])
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
