import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
