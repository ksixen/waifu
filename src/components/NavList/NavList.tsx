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
      {_list.map((nav, index) => (
        <div
          key={index}
          onClick={() => !nav.isActive && onClick(nav)}
          className={classNames({
            "nav-list-item": true,
            "nav-list-item--active": nav.isActive,
          })}
        >
          <span>{nav.title}</span>
        </div>
      ))}
    </nav>
  );
};
