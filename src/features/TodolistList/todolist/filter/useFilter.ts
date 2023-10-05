import { useCallback } from "react";
import { changeTodoFilterAC } from "../../todolists-reducer";
import { useAppDispatch } from "app/hook";
import { FilterValuesType } from "../../../../common/types/types";

export const useFilter = (id: string) => {
  const dispatch = useAppDispatch();
  const onChangeFilter = useCallback(
    (filter: FilterValuesType) =>
      dispatch(
        changeTodoFilterAC({
          id,
          filter,
        }),
      ),
    [],
  );
  return {
    onChangeFilter,
  };
};
