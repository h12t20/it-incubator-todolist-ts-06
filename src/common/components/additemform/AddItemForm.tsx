import React, { FC } from "react";
import { createTheme, IconButton, TextField, ThemeProvider } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAddItemForm } from "./useAddItemForm";

export type Props = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
  theme?: string;
};
export const darkTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: () => ({
          ...{
            backgroundColor: "rgb(51, 74, 92)",
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: () => ({
          ...{
            color: "orange",
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: () => ({
          ...{
            color: "orange",
          },
        }),
      },
    },
  },
});
export const lightTheme = createTheme({});
export const AddItemForm: FC<Props> = React.memo((props) => {
  const { title, onKeyPressHandler, onChangeTitleHandler, addItem, error } = useAddItemForm(props.addItem);
  return (
    <div>
      <ThemeProvider theme={props.theme === "Dark" ? darkTheme : lightTheme}>
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
      </ThemeProvider>
      <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
        <AddCircleRoundedIcon style={props.theme === "Dark" ? { color: "orange" } : {}}> </AddCircleRoundedIcon>
      </IconButton>
    </div>
  );
});
