import data from "../data.json";
import {Data, DataResponse} from "../../types.ts";


const fetchData = (req: string): DataResponse => {
    try {
        const hasNumber: boolean = /\d/.test(req);
        const hasSymbol: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(req);

        if (hasNumber || hasSymbol) {
            return {
                status: "failed",
                message: "request cannot contain number or symbol",
            };
        }

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
