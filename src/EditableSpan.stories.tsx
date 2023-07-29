import React from "react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

export const AddItemFormBaseExample=()=>{
    return <EditableSpan value='Start value' onChangeTitle={action('Title was changed')}/>
}