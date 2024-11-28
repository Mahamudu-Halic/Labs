import HomepageComponent from "./components/Homepage/Homepage.component.tsx";
import { useEffect, useState } from "react";
import { Data } from "../types.ts";
import HeaderComponent from "./components/Header/Header.component.tsx";
import getQuiz from "./utils/getQuiz.ts";
import QuizContainer from "./components/Quiz/QuizContainer.component.tsx";

/**
 * The main App component. It renders the header and either the homepage or the quiz container
 * depending on whether a quiz has been selected.
 *
 * @returns {JSX.Element} The JSX element representing the app.
 */
function App() {
  const [quiz, setQuiz] = useState<Data | undefined>(undefined);

  useEffect(() => {
    getQuiz({ callback: setQuiz, value: "" });
  }, []);

  return (
    <div className="wrapper">
      <HeaderComponent title={quiz?.title || ""} icon={quiz?.icon || ""} />
      {!quiz ? (
        <HomepageComponent setQuiz={setQuiz} />
      ) : (
        <QuizContainer quiz={quiz} setQuiz={setQuiz} />
      )}
    </div>
  );
}

export default App;
