import React, { FC } from "react";
import s from "./Sidebar.module.css";
import { MenuItem } from "./MenuItems/MenuItem";
import { Sort } from "./Sort/Sort";
import { Theme } from "./Theme/Theme";

type PropsType = {
  open: boolean;
  theme: string;
  handleClose: () => void;
};

export const Sidebar: FC<PropsType> = ({ open, theme, handleClose }) => {
  const sidebarClass = s.sidebar + (open ? " " + s.open : "");
  return (
    <>
      {open && theme === "Light" && <div className={s.background} onClick={handleClose} />}

      <aside className={sidebarClass} style={theme === "Dark" ? { backgroundColor: "rgb(51, 74, 92)" } : {}}>
        <nav id={"sidebar-menu"} className={s.nav} onMouseLeave={handleClose}>
          <MenuItem children={<Theme />} label={"Theme"} theme={theme} />
          <MenuItem children={<Sort theme={theme} />} label={"Sort"} theme={theme} />
        </nav>
      </aside>
    </>
  );
};
