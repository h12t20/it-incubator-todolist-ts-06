import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (addItemHandler: (newTitle: string) => Promise<any>) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      addItemHandler(newTitle)
        .then(() => setTitle(""))
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Title is required");
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (e.key === "Enter") {
      addItem();
    }
  };
  return {
    title,
    onKeyPressHandler,
    onChangeTitleHandler,
    addItem,
    error,
  };
};
