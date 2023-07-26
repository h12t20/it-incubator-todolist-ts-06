import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
type EditableSpanProps={
    value: string
    onChangeTitle:(newValue:string)=>void
}
export const EditableSpan =
    React.memo((props:EditableSpanProps) => {
    console.log('edit span'+props.value)
    const [editMode, setEditMode]=useState(false)
    const [title, setTitle]=useState(props.value)
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode=()=> {
        setEditMode(false)
        if (title) {props.onChangeTitle(title)}
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return editMode?<TextField type='text' size='small' onChange={onChangeHandler}
                               value={title} autoFocus onBlur={activateViewMode}
                               label='Type value'/>
        : <span onDoubleClick={activateEditMode} >{props.value}</span>
})