import React from "react";
import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export const AddItemFormBaseExample = () => {
  // @ts-ignore
  return <AddItemForm addItem={action('Button "add" was pressed inside the form')} />;
};
