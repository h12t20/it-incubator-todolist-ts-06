import React from "react";
import {TextField} from "@mui/material";
import {useEditableSpan} from "./useEditableSpan";

type EditableSpanProps = {
    value: string
    onChangeTitle: (newValue: string) => void
}
export const EditableSpan =
    React.memo((props: EditableSpanProps) => {
        const {
            editMode,
            title,
            onChangeHandler,
            activateViewMode,
            activateEditMode
        } = useEditableSpan(props.value, props.onChangeTitle)

        return editMode ? <TextField type='text' size='small' onChange={onChangeHandler}
                                     value={title} autoFocus onBlur={activateViewMode}
                                     label='Type value'/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    })