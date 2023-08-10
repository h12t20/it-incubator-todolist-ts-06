import {ChangeEvent, useState} from "react";

export const useEditableSpan = (value:string, onChangeTitle:(title:string)=>void) => {
    const [editMode, setEditMode]=useState(false)
    const [title, setTitle]=useState(value)
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode=()=> {
        setEditMode(false)
        if (title) {onChangeTitle(title)}
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return {
        editMode,
        title,
        onChangeHandler,
        activateViewMode,
        activateEditMode
    }
}