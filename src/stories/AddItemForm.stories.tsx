import React from "react";
import {AddItemForm} from "../AddItemForm";
import {action} from '@storybook/addon-actions'


export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

export const AddItemFormBaseExample=(prop:any)=>{
    return <AddItemForm addItem={action('Button "add" was pressed')}/>
}