import React, { FC } from "react";
import { TextField } from "@mui/material";
import { useEditableSpan } from "./useEditableSpan";
import s from "./EditableSpan.module.scss";
import "./EditableSpan.module.scss";

type Props = {
  value: string;
  onChangeTitle: (newValue: string) => void;
  disabled?: boolean;
  entityStatus?: string;
};
export const EditableSpan: FC<Props> = React.memo(({ value, onChangeTitle, entityStatus, disabled }) => {
  const { editMode, title, onChangeHandler, activateViewMode, activateEditMode } = useEditableSpan(
    value,
    onChangeTitle,
    entityStatus,
  );
  const spanStyle = (disabled: boolean | undefined) => ({
    opacity: disabled ? 0.5 : 1,
    brightness: disabled ? 0.5 : 1,
  });
  return editMode ? (
    <TextField
      inputProps={{
        style: { fontSize: 16 },
      }}
      ref={(ref) => ref && ref.focus()}
      onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
      multiline={true}
      maxRows={"10"}
      disabled={disabled}
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
    <span className={s.add3Dot} style={spanStyle(disabled)} onClick={activateEditMode}>
      {value}
    </span>
  );
});
