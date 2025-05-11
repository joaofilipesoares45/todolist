import { createContext, useEffect, useState } from "react";
import { today } from "../utils/functions";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [listToDos, setListToDos] = useState([])
    const [selectedTodo, setSelectedTodo] = useState()
    const [selectedDate, setSelectedDate] = useState(today())

    useEffect(() => {
        if (localStorage.getItem("todo:tasks") !== null) {
            setListToDos(JSON.parse(localStorage.getItem("todo:tasks")))
        }
    }, [])

    const value = {
        listToDos,
        setListToDos,
        selectedTodo, 
        setSelectedTodo,
        selectedDate, 
        setSelectedDate
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}