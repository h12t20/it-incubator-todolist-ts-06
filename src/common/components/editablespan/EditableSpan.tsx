import React from "react";
import { TextField } from "@mui/material";
import { useEditableSpan } from "./useEditableSpan";
import s from "./EditableSpan.module.scss";

type EditableSpanProps = {
  value: string;
  onChangeTitle: (newValue: string) => void;
  disabled?: boolean;
  entityStatus?: string;
};
export const EditableSpan = React.memo((props: EditableSpanProps) => {
  const { editMode, title, onChangeHandler, activateViewMode, activateEditMode } = useEditableSpan(
    props.value,
    props.onChangeTitle,
    props.entityStatus,
  );
  const spanStyle = (disabled: boolean | undefined) => ({
    opacity: disabled ? 0.5 : 1,
    brightness: disabled ? 0.5 : 1,
  });
  return editMode ? (
    <TextField
      disabled={props.disabled}
      type="text"
      size="small"
      onChange={onChangeHandler}
      value={title}
      autoFocus
      onBlur={activateViewMode}
      onKeyDown={(event) => {
        if (event.key == "Enter") activateViewMode();
      }}
      label="Type value"
    />
  ) : (
    <span className={s.add3Dot} style={spanStyle(props.disabled)} onClick={activateEditMode}>
      {props.value}
    </span>
  );
});
