import HomepageComponent from "./components/Homepage/Homepage.component.tsx";
import {useEffect, useState} from "react";
import {Data} from "../types.ts";
import QuizComponent from "./components/Quiz/Quiz.component.tsx";
import HeaderComponent from "./components/Header/Header.component.tsx";
import getQuiz from "./utils/getQuiz.ts";

function App() {
    const [quiz, setQuiz] = useState<Data | undefined>(undefined);

    useEffect(() => {
        getQuiz({callback: setQuiz, value: ""});
    }, []);
    
    return (
        <div className="wrapper">
            <HeaderComponent quiz={quiz}/>
            {
                !quiz && <HomepageComponent setQuiz={setQuiz}/>
            }

            {
                quiz && <QuizComponent quiz={quiz}/>
            }
        </div>
    )
}

export default App
