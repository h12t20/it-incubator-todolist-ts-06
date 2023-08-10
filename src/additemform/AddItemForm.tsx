import React from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {useAddItemForm} from "./useAddItemForm";

export type AddItemProps = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemProps) => {
    const {
        title,
        onKeyPressHandler,
        onChangeHandler,
        addItem,
        error
    } = useAddItemForm(props.addItem)

    return (
        <div>
            <TextField type='text' size='small' value={title}
                       onKeyDown={onKeyPressHandler}
                       onChange={onChangeHandler} error={!!error}
                       label='Type value' helperText={error}
            />
            <IconButton color='primary' onClick={addItem}><AddCircleRoundedIcon/>
            </IconButton>
        </div>
    )
});