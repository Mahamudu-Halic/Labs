import data from "../data.json";
import {Data, DataResponse} from "../../types.ts";

const fetchData = (req: string): DataResponse => {
    try {
        const question: Data | undefined = data.quizzes.find(
            (question: Data) => question.title.toLowerCase() === req.toLowerCase()
        );

        if (!question) {
            return {status: "failed", message: "Question not found"};
        }

        return {status: "success", data: question};
    } catch {
        return {status: "failed", message: "oops, something went wrong"};
    }
};

export default fetchData;
