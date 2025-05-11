import { useContext } from "react"
import { closeModal, formCaptureData, formClearInputs, today } from "../../../utils/functions"
import { DataContext } from "../../../context/DataContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewTodo() {
    const { listToDos, setListToDos } = useContext(DataContext)

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(event.target)
        if (data.texto) {
            data.data = today()
            if (localStorage.getItem("todo:tasks") !== null) {
                const newList = [...listToDos, data]
                localStorage.setItem("todo:tasks", JSON.stringify(newList))
            } else {
                localStorage.setItem("todo:tasks", JSON.stringify([data]))
            }
            setListToDos(JSON.parse(localStorage.getItem("todo:tasks")))
            formClearInputs(event.target)
        }
    }

    return (
        <div className="modal new-todo">
            <form onSubmit={submit}>
                <h3>Nova Tarefa <FontAwesomeIcon icon={faXmark} onClick={() => { closeModal("new-todo"); formClearInputs(document.querySelector(".new-todo form")) }} /></h3>
                <div className="inputs">
                    <div>
                        <label htmlFor="texto">titulo</label>
                        <input type="text" id="texto" name="texto" />
                    </div>
                    <div>
                        <label htmlFor="prioridade">prioridade</label>
                        <span onClick={({ target }) => {
                            if (target.tagName === "P") {
                                target.parentElement.parentElement.querySelector("input#prioridade").value = target.textContent

                                target.parentElement.querySelectorAll("p").forEach(p => {
                                    p.removeAttribute("selected")
                                });
                                target.setAttribute("selected", "")
                            }

                        }}>
                            <p>Baixa</p>
                            <p>Media</p>
                            <p>Alta</p>
                        </span>
                        <input type="text" id="prioridade" name="prioridade" />
                    </div>
                    <div>
                        <label htmlFor="descricao">descrição (opcional)</label>
                        <textarea type="time" id="descricao" name="descricao"></textarea>
                    </div>

                </div>
                <nav>
                    <button type="submit">Confirmar</button>
                </nav>
            </form>
        </div>

    )
}