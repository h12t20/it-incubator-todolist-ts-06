import React, { FC, ReactNode, useState } from "react";
import s from "../Sidebar.module.css";

type Props = {
  children: ReactNode;
  label: string;
};
export const MenuItem: FC<Props> = ({ children, label }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <div className={s.item} onMouseOver={handleOpen} onMouseLeave={handleClose}>
      <div className={s.label}>{label}</div>
      {open && children}
    </div>
  );
};
