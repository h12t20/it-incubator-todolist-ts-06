import React, { FC } from "react";
import s from "./Sidebar.module.css";
import { MenuItem } from "./MenuItems/MenuItem";
import { Sort } from "./Sort/Sort";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export const Sidebar: FC<PropsType> = ({ open, handleClose }) => {
  const sidebarClass = s.sidebar + (open ? " " + s.open : "");
  return (
    <>
      {open && <div className={s.background} onClick={handleClose} />}

      <aside className={sidebarClass}>
        <nav id={"sidebar-menu"} className={s.nav} onMouseLeave={handleClose}>
          <div className={s.item} id={"sidebar-setting"} onClick={handleClose}>
            Setting
          </div>
          <div className={s.item} id={"sidebar-search"}>
            Search
          </div>

          <MenuItem children={<Sort />} label={"Sort"} />
        </nav>
      </aside>
    </>
  );
};
