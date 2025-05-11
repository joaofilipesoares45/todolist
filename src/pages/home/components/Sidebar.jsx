import { closeModal } from "../../../utils/functions"

export default function Sidebar() {
    return (
        <div className="modal sidebar" onClick={({target}) => {
            if (target.classList[1] === "sidebar") {
                closeModal("sidebar")
            }
        }}>
            <div className="content">

            </div>
        </div>
    )
}