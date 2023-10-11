import React, { ChangeEvent } from "react";
import s from "../Sidebar.module.css";
import { useAppDispatch } from "common/hooks/hook";
import { setThemeAC } from "app/app-reducer";
import { useSelector } from "react-redux";
import { themeSelector } from "common/selectors/selectors";

export const Theme = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector(themeSelector);
  const themeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setThemeAC({ theme: e.currentTarget.value }));
  };
  return (
    <div className={s.sort} style={theme === "Dark" ? { color: "orange", backgroundColor: "rgb(33,33,33)" } : {}}>
      <fieldset style={theme === "Dark" ? { borderColor: "orange" } : {}}>
        <legend>Theme:</legend>
        <div>
          <input
            type="radio"
            id="light_theme"
            name="Light"
            value="Light"
            onChange={themeChangeHandler}
            checked={theme === "Light"}
            style={theme === "Dark" ? { cursor: "pointer" } : {}}
          />
          <label form="Light">Light</label>
        </div>
        <div>
          <input
            type="radio"
            id="dark_theme"
            name="Dark"
            value="Dark"
            onChange={themeChangeHandler}
            checked={theme === "Dark"}
            style={theme === "Light" ? { cursor: "pointer" } : {}}
          />
          <label form="Dark">Dark</label>
        </div>
      </fieldset>
    </div>
  );
};
