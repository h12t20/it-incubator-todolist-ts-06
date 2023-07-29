import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export type AddItemProps = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemProps) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }
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