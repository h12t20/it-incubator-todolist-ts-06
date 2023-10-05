import Button from "@mui/material/Button";
import React, { FC } from "react";
import { useFilter } from "./useFilter";
import { FilterValuesType } from "common/types/types";

type Props = {
  id: string;
  filter: FilterValuesType;
};
export const Filter: FC<Props> = React.memo(({ filter, id }) => {
  const { onChangeFilter } = useFilter(id);
  return (
    <div className="button">
      <Button
        size="small"
        color="primary"
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => onChangeFilter("all")}
      >
        All
      </Button>
      <Button
        size="small"
        color="success"
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => onChangeFilter("active")}
      >
        Active
      </Button>
      <Button
        size="small"
        color="secondary"
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => onChangeFilter("completed")}
      >
        Completed
      </Button>
    </div>
  );
});
