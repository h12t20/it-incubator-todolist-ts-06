import {ChangeEvent, KeyboardEvent, useState} from "react";
export type AddItemProps = {
    addItem: (title: string) => void
}
export const useAddItemForm = (addItemHandler:(newTitle:string)=>void)=> {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItemHandler(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return {
        title,
        onKeyPressHandler,
        onChangeHandler,
        addItem,
        error
    }
}