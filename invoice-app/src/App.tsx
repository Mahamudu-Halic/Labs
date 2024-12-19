import './App.css'
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Container from "./components/ui/container/Container.tsx";
import Invoices from "./components/invoices/Invoices.tsx";

function App() {

    return (
        <Container container={"section"} className={"app"}>
            <Sidebar/>
            <Container container={"section"} className={"content"}>
                <Container container={"div"} className={"wrapper"}>
                    <Invoices/>
                </Container>
            </Container>
        </Container>
    )
}

export default App
