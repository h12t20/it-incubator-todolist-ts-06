import React, { FC, ReactNode, useState } from "react";
import s from "../Sidebar.module.css";

type Props = {
  children: ReactNode;
  label: string;
  theme: string;
};

export const MenuItem: FC<Props> = ({ children, label, theme }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const menuItemClass = s.item + (theme === "Dark" ? " " + s.darkTheme : " " + s.lightTheme);
  return (
    <div className={menuItemClass} onMouseOver={handleOpen} onMouseLeave={handleClose}>
      <div className={s.label} style={theme === "Dark" ? { color: "orange" } : {}}>
        {label}
      </div>
      {open && children}
    </div>
  );
};
