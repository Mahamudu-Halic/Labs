import HomepageComponent from "./components/Homepage/Homepage.component.tsx";
import { useEffect, useState } from "react";
import { Data, DataResponse } from "../types.ts";
import HeaderComponent from "./components/Header/Header.component.tsx";
import QuizContainer from "./components/Quiz/QuizContainer.component.tsx";
import fetchData from "./utils/fetchData.ts";

function App() {
  const [quiz, setQuiz] = useState<Data | undefined>(undefined);

  const getQuiz = (value: string) => {
    const quiz = sessionStorage.getItem("quiz");
    const response: DataResponse = fetchData(quiz || value);

    if (response.status === "failed") {
      return;
    }

    sessionStorage.setItem("quiz", quiz || value);
    setQuiz(response.data);
  };

  const reset = () => {
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("questionNumber");
    sessionStorage.removeItem("hasCompleted");
    sessionStorage.removeItem("quiz");
    setQuiz(undefined);
  };

  useEffect(() => {
    getQuiz("");
  }, []);

  return (
    <div className="wrapper">
      <HeaderComponent title={quiz?.title || ""} icon={quiz?.icon || ""} />
      {!quiz ? (
        <HomepageComponent getQuiz={getQuiz} />
      ) : (
        <QuizContainer quiz={quiz} reset={reset} />
      )}
    </div>
  );
}

export default App;
