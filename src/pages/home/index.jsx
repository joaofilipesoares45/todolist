import "./index.css"
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { openModal } from "../../utils/functions";
import Sidebar from "./components/Sidebar";
import EditTodo from "./components/EditTodo";

export default function Home() {
    return (
        <div className="page home">
            <main>
                <header>
                    <FontAwesomeIcon icon={faBars} onClick={() => openModal("sidebar")} />
                    <h1>To-do <FontAwesomeIcon icon={faEllipsisVertical} /></h1>
                </header>
                <TodoList />
            </main>
            <Sidebar />
            <NewTodo />
            <EditTodo />
        </div>
    )
}