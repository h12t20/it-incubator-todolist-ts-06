import Button from "@mui/material/Button";
import React from "react";
import {useFilter} from "./useFilter";
import {FilterValuesType} from "../../todolists-reducer";
type FilterPropsType = {
    id: string
    filter: FilterValuesType
}
export const Filter = React.memo((props: FilterPropsType) => {
    const {
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
    } = useFilter(props.id)
    return (
        <div className='button'>
            <Button size='small' color='primary' variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button size='small' color='success' variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size='small' color='secondary' variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    )
})