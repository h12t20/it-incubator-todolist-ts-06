import {useCallback} from 'react';
import {changeTodoFilterAC} from "../../todolists-reducer";
import {useAppDispatch} from "../../../../app/hook";

export const useFilter = (id: string) => {
    const dispatch = useAppDispatch();
    const onAllClickHandler = useCallback(() => dispatch(changeTodoFilterAC({id, filter: "all"})), []);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodoFilterAC({id, filter: "active"})), []);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodoFilterAC({id, filter: "completed"})), []);
    return {
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
    }
}
