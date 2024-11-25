import {useState} from 'react'

import './App.css'
import ThemeToggler from "./components/ThemeToggler/ThemeToggler.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <ThemeToggler/>
        </>
    )
}

export default App
