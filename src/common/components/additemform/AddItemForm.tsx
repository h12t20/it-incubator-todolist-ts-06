import React, { FC } from "react";
import { IconButton, TextField } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAddItemForm } from "./useAddItemForm";

export type Props = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
};
export const AddItemForm: FC<Props> = React.memo((props) => {
  const { title, onKeyPressHandler, onChangeTitleHandler, addItem, error } = useAddItemForm(props.addItem);

  return (
    <div>
      <TextField
        multiline={true}
        type="text"
        size="small"
        value={title}
        onKeyDown={onKeyPressHandler}
        onChange={onChangeTitleHandler}
        error={!!error}
        label="Type value"
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
        <AddCircleRoundedIcon />
      </IconButton>
    </div>
  );
});
