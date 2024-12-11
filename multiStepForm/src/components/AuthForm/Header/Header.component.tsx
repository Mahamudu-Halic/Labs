import {useState} from "react";
import {resetForm} from "../../../features/Form/FormSlice.tsx";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";

const Header = ({title, description}: { title: string, description: string }) => {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false);
    const toggleShowModal = () => setShowModal(prev => !prev)

    const handleReset = () => {
        dispatch(resetForm())
        toggleShowModal()
    }
    return (
        <header>
            <div className={"header__content"}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <button onClick={toggleShowModal}>Reset</button>

            {showModal && <div className={"header__reset-modal"}>
                <p>Are you sure you want to reset the form</p>
                <div className="confirm-button-container">
                    <button className={"cancel-btn"} onClick={toggleShowModal}>No</button>
                    <button onClick={handleReset}>Yes</button>
                </div>
            </div>}
        </header>
    )
}

export default Header