import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faSquare, faSquareCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { openModal, today } from "../../../utils/functions";

export default function TodoList() {
    const { listToDos, setListToDos, setSelectedTodo, selectedDate, setSelectedDate } = useContext(DataContext)

    const deleteTask = (index) => {
        const newList = listToDos.filter((_, i) => i !== index)

        localStorage.setItem("todo:tasks", JSON.stringify(newList))
        setListToDos(newList)
    }

    const setCompleted = (index) => {
        const task = listToDos.filter((_, i) => i === index)[0]
        const newList = listToDos

        if (!task.status || task.status !== "completed") {
            task.status = "completed"
            newList[index] = task
            localStorage.setItem("todo:tasks", JSON.stringify(newList))
        } else if (task.status === "completed") {
            task.status = ""
            newList[index] = task
            localStorage.setItem("todo:tasks", JSON.stringify(newList))
        }

        setListToDos(JSON.parse(localStorage.getItem("todo:tasks")))
    }

    return (
        <div className="todo-list">
            <nav className="select-date">
                    <label htmlFor="date">Selecione a data: </label>
                    <input type="date" name="date" id="date" onChange={({target}) => setSelectedDate(target.value)}/>
                </nav>
            <div className="list">
                {listToDos.filter(({data}) => data === selectedDate).length > 0 ? listToDos.map((item, index) => {
                    const delay = `${index * Number(".05")}s`
                    return (
                        <div className="item" key={"todo" + index} visible={item.data === selectedDate ? "true" : "false"} style={{animationDelay:delay}}>
                            <div className="info">
                                <span>
                                    {item.status ? <FontAwesomeIcon icon={faSquareCheck} onClick={() => setCompleted(index)} /> : <FontAwesomeIcon icon={faSquare} onClick={() => setCompleted(index)} />}
                                    <p color={item.prioridade}></p>
                                </span>

                                <h4>{item.texto}</h4>
                                <nav><FontAwesomeIcon icon={faPencil} onClick={() => { openModal("edit-todo"); setSelectedTodo(index) }} />{item.status && <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteTask(index)} />}</nav>
                            </div>
                        </div>
                    )
                }): <div><span className="none">{selectedDate === today() ? "Nenhuma tarefa para hoje!":"Nenhuma tarefa para o dia selecionado!"}</span></div>}
            </div>
            <div className="options">
                <button onClick={() => openModal('new-todo')}>Nova Tarefa <FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    )
}