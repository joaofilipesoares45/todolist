import { useContext, useEffect } from "react"
import { closeModal, formCaptureData, formClearInputs } from "../../../utils/functions"
import { DataContext } from "../../../context/DataContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form"

export default function EditTodo() {
    const { listToDos, setListToDos, selectedTodo, setSelectedTodo } = useContext(DataContext)

    const { register, setValue } = useForm({
        defaultValues: {
            texto: "",
            data: "",
            hora: "",
            prioridade: "",
            descricao: ""
        }
    })

    useEffect(() => {
        if (selectedTodo !== undefined) {
            setValue('texto', listToDos[selectedTodo].texto)
            setValue('prioridade', listToDos[selectedTodo].prioridade)
            setValue('descricao', listToDos[selectedTodo].descricao)
        } else {
            setValue('texto', "")
            setValue('prioridade', "")
            setValue('descricao', "")
        }
    }, [selectedTodo])

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(event.target)
        const newList = listToDos

        if (data.texto) {
            newList[selectedTodo] = Object.assign(newList[selectedTodo], data) 
            localStorage.setItem("todo:tasks", JSON.stringify(newList))
            setListToDos(JSON.parse(localStorage.getItem("todo:tasks")))
            formClearInputs(event.target)
            setSelectedTodo()
            closeModal("edit-todo")
        }
    }

    return (
        <div className="modal edit-todo">
            <form onSubmit={submit}>
                <h3>Editar Tarefa <FontAwesomeIcon icon={faXmark} onClick={() => { closeModal("edit-todo"); formClearInputs(document.querySelector(".edit-todo form")) }} /></h3>
                <div className="inputs">
                    <div>
                        <label htmlFor="texto">titulo</label>
                        <input type="text" id="texto" name="texto" {...register("texto")} />
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
                        <input type="text" id="prioridade" name="prioridade" {...register("prioridade")} />
                    </div>
                    <div>
                        <label htmlFor="descricao">descrição (opcional)</label>
                        <textarea type="time" id="descricao" name="descricao" {...register("descrição")}></textarea>
                    </div>

                </div>
                <nav>
                    <button type="submit">Confirmar</button>
                </nav>
            </form>
        </div>

    )
}