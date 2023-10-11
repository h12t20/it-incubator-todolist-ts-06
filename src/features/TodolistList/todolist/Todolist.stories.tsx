import React from "react";
import { ReduxStoreProviderDecorator } from "../../../stories/ReduxStoreProviderDecorator";
import { Todolist } from "./Todolist";

export default {
  title: "Todolist Component",
  component: Todolist,
  decorators: [ReduxStoreProviderDecorator],
};

export const TodolistBaseExample = () => {
  return (
    <>
      <Todolist id="todolistId1" theme={"Dark"} title="What to learn" filter="all" entityStatus="idle" />
      <Todolist id="todolistId2" theme={"Light"} title="What to buy" filter="all" entityStatus="idle" />
    </>
  );
};
