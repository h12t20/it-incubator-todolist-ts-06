import React, { ChangeEvent, FC } from "react";
import s from "../Sidebar.module.css";
import { useAppDispatch } from "../../../common/hooks/hook";
import { setSortTypeAC } from "../../../app/app-reducer";
import { useSelector } from "react-redux";
import { sortSelector } from "../../../common/selectors/selectors";

export const Sort: FC<{ theme: string }> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const sortType = useSelector(sortSelector);
  const sortChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortTypeAC({ sortType: e.currentTarget.value }));
  };
  return (
    <div className={s.sort} style={theme === "Dark" ? { color: "orange", backgroundColor: "rgb(33,33,33)" } : {}}>
      <fieldset style={theme === "Dark" ? { borderColor: "orange" } : {}}>
        <legend>Select:</legend>
        <div>
          <input
            type="radio"
            id="sort_by_date"
            name="date"
            value="by Date"
            onChange={sortChangeHandler}
            checked={sortType === "by Date"}
            style={sortType === "by ABC" ? { cursor: "pointer" } : {}}
          />
          <label form="date">by Date</label>
        </div>
        <div>
          <input
            type="radio"
            id="sort_by_abc"
            name="abc"
            value="by ABC"
            onChange={sortChangeHandler}
            checked={sortType === "by ABC"}
            style={sortType === "by Date" ? { cursor: "pointer" } : {}}
          />
          <label form="abc">by ABC</label>
        </div>
      </fieldset>
    </div>
  );
};
