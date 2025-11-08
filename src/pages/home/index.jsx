import "./index.css"
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import { openModal } from "../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPlus, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
    const [darkMode, setDarkMode] = useState(true)

    return (
        <div className={`page home ${!darkMode && "dark"} dark:bg-[rgb(80,84,201)] bg-blue-200`}>
            <header className="p-2.5">
                <div className="options flex justify-center gap-2.5">
                    <button className="dark:bg-[rgba(255,255,255,0.4)] dark:hover:bg-[rgba(255,255,255,0.59)] dark:text-gray-800 bg-blue-700 hover:bg-blue-950 text-white p-2.5 px-4.5 w-full max-w-[500px] mx-10px rounded-full font-semibold shadow-lg" onClick={() => openModal('new-todo')}>
                        Nova Tarefa
                        <FontAwesomeIcon icon={faPlus} className="text-[1.1rem]" />
                    </button>

                    <nav className="flex items-center [&>svg]:bg-[rgba(0,34,255,0.62)] text-white dark:text-blue-950 dark:[&>svg]:bg-[rgba(255,255,255,0.4)] [&>svg]:p-1.5 [&>svg]:rounded-full dark:[&>svg]:hover:bg-[rgba(255,255,255,0.72)] [&>svg]:hover:bg-[rgba(0,48,168,0.72)] [&>svg]:shadow-md text-2xl">
                        {darkMode ?
                            <FontAwesomeIcon icon={faMoon} className="px-[9px]!" onClick={() => {
                                setDarkMode(!darkMode)
                                document.querySelector("html").setAttribute("data-theme", "dark")
                            }} /> :
                            <FontAwesomeIcon icon={faSun} onClick={() => setDarkMode(!darkMode)} />
                        }
                    </nav>
                </div>
            </header>
            <main>
                <TodoList />
            </main>
            <NewTodo />
            <EditTodo />
        </div>
    )
}